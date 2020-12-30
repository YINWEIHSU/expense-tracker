const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Expense = require('./models/expense')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 
const routes = require('./routes')

const PORT = 3000

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true,  useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
})

app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

//路由


app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})