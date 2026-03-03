//importing all necessary packages
const express= require('express')
const mongoose= require('mongoose')
const jwt= require("jsonwebtoken")
const cors= require("cors")
const dotenv= require("dotenv")
dotenv.config() //important to process enviroenment variables

//for including routers
const authRoutes= require('./routes/auth.routes')
const groupRoutes= require('./routes/group.routes')
const expenseRoutes= require('./routes/expense.routes')
const settlementRoutes= require('./routes/settlement.routes')

const app= express()
//using the imported middlewares and routers
app.use(express.json()) //json data accept krne ke liye
app.use(express.urlencoded({extended:true})) //url se aaya hua data accept krne ke loye
app.use('/api/auth', authRoutes)
app.use('/api/groups', groupRoutes)
app.use('/api/expenses',expenseRoutes)
app.use('/api/settlement',settlementRoutes)



app.get('/',(req,res) => {
  res.send("dude dues api is running")
}
)

const port=process.env.PORT || 3000 // ya toh environment variable se banao nahi toh 5000 port accept

//connecting the database cluster and listening the express server as well
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(port,() => {
  console.log(`app is listening at ${port}`)
})})
.catch((err) => {
  console.log(err)
}
)



