const mongoose= require("mongoose")


const expenseSchema= new mongoose.Schema(
    {
        group:{type:mongoose.Schema.Types.ObjectId,ref:'Group',required:true},
        paid_by:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
        category:{type:String},
        desc:{type:String},
        total_amount:{type:Number,required:true},
        splits:[
            {
            user:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
            amount:{type:Number,required:true},
            is_paid:{type:Boolean,default:false}
        }
        ]
        
    },{timestamps:true}
)



module.exports= mongoose.model('Expenses',expenseSchema)