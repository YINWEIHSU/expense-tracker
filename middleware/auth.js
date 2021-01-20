module.exports = {
  authenticator: (req, res, next) => {
    console.log(req)
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/users/login')
  }
}