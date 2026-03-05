const express = require('express');
const router = express.Router();
const { add_expense, get_group_expense, mark_as_settled } = require('../controllers/expense.controller');
const verify_authentication = require('../middleware/auth.middleware');

router.post('/add', verify_authentication, add_expense);
router.get('/group/:group_id', verify_authentication, get_group_expense);
router.patch('/settle/:expense_id', verify_authentication, mark_as_settled);

module.exports = router;