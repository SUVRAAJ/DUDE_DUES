const express= require("express")
router= express.Router()
const {create_group,show_my_groups,add_members}= require('../controllers/group.controller')
const veried_user= require('../middleware/auth.middleware')

router.post('/create',veried_user,create_group)
router.get('/my-groups',veried_user,show_my_groups)
router.post('/add-members',veried_user,add_members)

module.exports= router