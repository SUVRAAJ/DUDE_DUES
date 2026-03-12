//FOR AUTHENTICATION OF USER ACQUIRING BCRRPY FOR PASSWROD JWT FOR SESSION TOKEN
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")
const User= require('../models/user.model') //acquiring user model as we have to verify the user only
const { json } = require("express")

const sign_up= async (req,res) => {
    try{
        const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const password_regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

        if (!email_regex.test(email)) return res.status(400).json({message: "Invalid email format"})
        if (!password_regex.test(password)) return res.status(400).json({message: "Password must be at least 8 characters with letters and numbers"})
        if (!name || !name.trim()) return res.status(400).json({message: "Name is required"})
        
        const{name,email,password}= req.body //accepting data from sign up form

        const existing_user= await User.findOne({email}) //checking if email already exists
        if(existing_user) return res.status(400).json({message:"User already exists"});

        const encrypted_password= await bcrypt.hash(password,10) //eccrypting password for storing user in datavase
        const new_user= await User.create({name:name,email:email,password:encrypted_password})

        const token= jwt.sign({id:new_user._id}, process.env.JWT_SECRET,{expiresIn: '7d'}) //assigning session token
        res.status(201).json({token,user:{id:new_user._id,name:new_user.name,email:new_user.email}})

    }
    catch(err){
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

const log_in= async (req,res) => {
    try{
        const {email,password}= req.body

        const entered_user= await User.findOne({email}) //checking if user has entered valid email
        if(!entered_user) res.status(404).json({message:"The entered email is not registered"});
        
        const isMatch= await bcrypt.compare(password, entered_user.password) //and valid password
        if(!isMatch) res.status(400).json({message:"invalid credentials"});

        const token= jwt.sign({id:entered_user._id}, process.env.JWT_SECRET,{expiresIn: '7d'}) //if yes assigning authetnicity token
        res.status(201).json({token,user:{id:entered_user._id,name:entered_user.name,email:entered_user.email}})
    }
    catch(err)
    {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

const find_user= async (req,res) => {
  try {
    const {email}= req.query

    const user= await User.findOne({email})
    if(!user) return res.status(404).json({message:"The user was not found"});

    res.status(200).json({user})
  } catch (error) {
    res.status(500).json({message:"server error", error:error.message})
  }
}


module.exports= {log_in,sign_up,find_user}