const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')
const expenseController = require('../controllers/api/expenseController')
const Record = require('../models/record')
const userController = require('../controllers/api/userController')
const passport = require('../config/passport')
const authenticated = passport.authenticate('jwt', { session: false })


function convertToThousands(data) {
  let total = 0
  for (let item of data) {
    total += item.amount
    item.stringAmount = item.amount.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' }).slice(4, -3)
  }
  total = total.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' }).slice(0, -3)

  return { data, total }
}

function formatDate(date) {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
}

router.get('/', authenticated, (req, res) => {
  const { categorySelected, monthSelected } = req.query
  const userId = req.user._id

  Record.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then(expense => {
      res.json(expense)
    })
    .catch(error => console.error(error))
})
router.get('/expenses/new', expenseController.createExpense)
router.get('/expenses/:id/edit', expenseController.editExpense)
router.post('/expenses/', expenseController.postExpense)
router.put('/expenses/:id', expenseController.putExpense)
router.delete('/expenses/:id', expenseController.deleteExpense)

router.get('/users/login', userController.signInPage)
router.post('/users/login', userController.signIn)
router.get('/users/register', userController.signUpPage)
router.post('/users/register', userController.signUp)
router.get('/users/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router