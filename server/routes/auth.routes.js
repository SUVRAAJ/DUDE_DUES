const express= require("express")
router=express.Router()
const {log_in,sign_up,find_user}= require('../controllers/auth.controller')


router.post('/signup', sign_up)
router.post('/login',log_in)
router.get('/find-user',find_user)
module.exports= router