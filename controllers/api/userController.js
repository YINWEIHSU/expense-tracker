const express = require('express')
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const userController = {
  signInPage: (req, res) => {
    res.render('login')
  },
  signIn: passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  }),
  signUpPage: (req, res) => {
    res.render('register')
  },
  signUp: (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: '所有欄位都是必填。' })
    }
    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符。' })
    }
    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    User.findOne({ email })
      .then(user => {
        if (user) {
          errors.push({ message: '這個 Email 已經註冊過了。' })
          return res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword
          })
        }
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(() => {
            req.flash('success_msg', '您已成功註冊。')
            res.redirect('/users/login')
          })
          .catch(err => console.log(err))
      })

  }
}

module.exports = userController