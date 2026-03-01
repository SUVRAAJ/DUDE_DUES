const mongoose= require("mongoose")

const groupSchema= new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String},
    members:[{type: mongoose.Schema.Types.ObjectId, ref:'users'}],
    createdBy:{type: mongoose.Schema.Types.ObjectId, ref:'users'}
},{timestamps:true})

module.exports= mongoose.model('Group',groupSchema)