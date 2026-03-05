const Expenses= require('../models/expense.models')
const Group= require('../models/group.models')

const add_expense= async (req,res) => {
  try{
    const {group_id,category,descrription,total_amount}= req.body;

  const check_group= await Group.findById(group_id).populate('members')
  if(!check_group) return res.status(404).json({message:"group not found"});

  const is_member= check_group.members.some(m=> m._id.toString()=== req.user.id)
  if(!is_member) return res.status(403).json({message:"You are not in this group"});

  const member_count= check_group.members.length
  const individual_share= parseFloat((total_amount/member_count).toFixed(2))

  const splits= check_group.members.map(
    member=>({
        user:member._id,
        amount: individual_share,
        is_paid: member._id.toString()===req.user.id
    })
  )
  
  const new_expense= await Expenses.create(
    {
        group:group_id,
        paid_by:req.user.id,
        descrription,
        category,
        total_amount,
        splits
    }
  )

  res.status(201).json({message:"New expense added", new_expense})
  }
  catch(err)
  {
    res.status(500).json({message:"server error",error:err.message})
  }
}


const get_group_expense= async (req,res) => {
  try{
    const {group_id}= req.params
  const check_group= await Expenses.find({group:group_id})
  .populate('paid_by', 'name email')
  .populate('splits.user', 'name email')
  res.status(200).json({ check_group });
  }
  catch(err)
  {
    res.status(500).json({message:"server error", error:err.message})
  }
}

const mark_as_settled= async (req,res) => {
  try{
    const {expense_id}= req.params

  const check_expense= await Expenses.findById(expense_id)
  if(!check_expense) return res.status(404).json({message:"Expense not found"});

  const check_split= check_expense.splits.find(m=> m.user.toString()===req.user.id)
  if(!check_split) return res.status(404).json({message:"you dont owe this expense"});

  check_split.is_paid=true
  await check_expense.save()

  res.status(200).json({message:"marked as settled"},check_expense)
  }
  catch(err)
  {
    res.status(500).json({message:"server error",error:err.message})
  }
}


module.exports= {add_expense,get_group_expense,mark_as_settled}