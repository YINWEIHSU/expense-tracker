const express = require('express')
const router = express.Router()
// const User = require('../../models/user')
// const passport = require('passport')
// const bcrypt = require('bcryptjs')
const userController = require('../../controllers/userController')

router.get('/login', userController.signInPage)
router.post('/login', userController.signIn)
router.get('/register', userController.signUpPage)
router.post('/register', userController.signUp)
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router