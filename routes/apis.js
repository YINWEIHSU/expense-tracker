const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')
const expenseController = require('../controllers/api/expenseController')
const Record = require('../models/record')
const userController = require('../controllers/api/userController')
const passport = require('../config/passport')
const authenticated = passport.authenticate('jwt', { session: false })

router.get('/', authenticated, expenseController.getExpenses)
router.post('/expenses/', expenseController.postExpense)
router.put('/expenses/:id', expenseController.putExpense)
router.delete('/expenses/:id', expenseController.deleteExpense)

router.post('/users/login', userController.signIn)
router.post('/users/register', userController.signUp)

module.exports = router