const express = require('express')
const session = require('express-session')
const app = express()
const exphbs = require('express-handlebars')
const hdb = require('handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

const usePassport = require('./config/passport')
const user = require('./models/user')
require('./config/mongoose')

const PORT = process.env.PORT || 3000

hdb.registerHelper('ifEquals', function (arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes)



app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})