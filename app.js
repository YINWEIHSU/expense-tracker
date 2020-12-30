const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const Expense = require('./models/expense')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 
const routes = require('./routes')
require('./config/mongoose')

const PORT = 3000



app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

//路由


app.listen(PORT, () => {
    console.log('App is running on http://localhost:3000')
})