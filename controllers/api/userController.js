const express = require('express')
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// JWT
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const userController = {
  signIn: (req, res) => {
    // 檢查必要資料
    if (!req.body.email || !req.body.password) {
      return res.json({ status: 'error', message: "所有欄位都是必填。" })
    }
    // 檢查 user 是否存在與密碼是否正確
    let username = req.body.email
    let password = req.body.password

    User.findOne({ email: username }).then(user => {
      if (!user) return res.status(401).json({ status: 'error', message: '查無此使用者' })
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ status: 'error', message: '密碼與確認密碼不相符。' })
      }
      // 簽發 token
      var payload = { id: user.id }
      var token = jwt.sign(payload, process.env.JWT_SECRET)
      return res.json({
        status: 'success',
        message: 'ok',
        token: token,
        user: {
          id: user.id, name: user.name, email: user.email
        }
      })
    })
  },
  signUp: (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    if (!name || !email || !password || !confirmPassword) {
      return res.status(401).json({ status: 'error', message: '所有欄位都是必填。' })
    }
    if (password !== confirmPassword) {
      return res.status(401).json({ status: 'error', message: '密碼與確認密碼不相符。' })
    }
    User.findOne({ email })
      .then(user => {
        if (user) {
          return res.json({ status: 'error', message: '這個 Email 已經註冊過了。' })
        }
        User.create({
          name,
          email,
          password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
        })
          .then(user => {
            return res.json({ status: 'success', message: '成功註冊帳號！' })
          })
          .catch(err => console.log(err))
      })
  }
}

module.exports = userController