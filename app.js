const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const Record = require('./models/expense')
const hdb = require('handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 
const routes = require('./routes')
require('./config/mongoose')

const PORT = 3000

hdb.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  })

app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

//路由


app.listen(PORT, () => {
    console.log('App is running on http://localhost:3000')
})