//import the models of group and expenses models
const Group= require('../models/group.models')
const Expense= require('../models/expense.models')

const settlement_algo= async (req,res) => {
  try{
    const {group_id}= req.params

    const check_group= await Group.findById(group_id).populate('members', 'name email')
    if(!check_group) return res.status(404).json({message:"Group not found"});

    const check_expense= await Expense.find({group:group_id})

    //using an object of objects to find the net amount for each member
    const balances={}
    //initiaizing for each member
    check_group.members.forEach(element => {
        balances[element._id]= {user:element, amount:0}
    });

    //ADDING THE AMOUNT PAID AND SUBTRACTING THE AMOUNT OWED
    check_expense.forEach(element => {
        //adding the amount paid by a member
        balances[element.paid_by].amount += element.total_amount

        element.splits.forEach(split=>{
            balances[split.user].amount -= split.amount
        })

    });

    //seperate into creditors and debtors

    const creditors=[]
    const debtors=[]

    Object.values(balances).forEach(element=>
    {
        if(element.amount>0) creditors.push({...element});
        else if(element.amount<0) debtors.push({...element, amount:-element.amount})
    }
    )

    //transaction steps

    const transactions=[] //array of objects
    let i=0,j=0;

    while(i<creditors.length && j<debtors.length)
    {
        let creditor= creditors[i]
        let debtor=debtors[j]

        const amount=Math.min(creditor.amount,debtor.amount)

        transactions.push({
            to:creditor.user,
            from:debtor.user,
            amount_trans:parseFloat(amount.toFixed(2))
        })
        
        debtor.amount-=amount
        creditor.amount-=amount

        //move pointers if transaction settled
        if(debtor.amount===0) j++
        if(creditor.amount===0) i++
    }
    res.status(200).json({transactions})

  }
  catch(err)
  {
    res.status(500).json({message:"Server error", error:err.message})
  }
}


module.exports= {settlement_algo}