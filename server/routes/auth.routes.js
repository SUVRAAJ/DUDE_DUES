const express= require("express")
router=express.Router()
const {log_in,sign_up}= require('../controllers/auth.controller')


router.post('/signup', sign_up)
router.post('/login',log_in)

module.exports= router