const express= require('express')
const router= express.Router()
const {settlement_algo}= require('../controllers/settlement.controller')
const verify_authentication= require('../middleware/auth.middleware')

router.get('/:group_id',verify_authentication,settlement_algo)

module.exports= router