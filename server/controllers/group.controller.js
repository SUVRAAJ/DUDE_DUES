//requiring group model to perform necessary operations
const Group= require('../models/group.models')

//creating group method
const create_group= async (req,res) => {
    try{
        const {name,description}= req.body //creating new group from the form submission
        const new_group= await Group.create({
            name,
            description,
            members:[req.user.id], //initially only the user who has created grioup will be present
            createdBy: req.user.id
        })

        res.status(201).json({message:"Group is created",new_group})
    }
    catch(err)
    {
        res.status(500).json({message:"server error"})
    }
}

const add_members= async (req,res) => {
  try{
    const {user_id,group_id}= req.body
    console.log("add member body:", req.body) 

  const check_group= await Group.findById(group_id)
  if(!check_group) return res.status(404).json({message:"group not found"}); //checking if group exists or not

  //checkinf if the member is admin or not
  if(check_group.createdBy.toString() != req.user.id) return res.status(403).json({message:"only admins can add members"})

  if(check_group.members.includes(user_id)) return res.status(400).json({message:"member is already there"});

  check_group.members.push(user_id)
  await check_group.save()
  res.status(200).json({message:"group member added"})
  }
  catch(err)
  {
    res.status(500).json({message:"server error occured",error:err.message})
  }

}

//showing all enrolled groups
const show_my_groups= async (req,res) => {
  try{
    const showed_groups= await Group.find({members:req.user.id})
  .populate('members','name email')
  .populate('createdBy','name email')

  res.status(200).json({showed_groups}) //passing the extracted groups
  }
  catch(err)
  {
    res.status(500).json({message:"There is a server error"})
  }
}


module.exports= {create_group,show_my_groups,add_members}