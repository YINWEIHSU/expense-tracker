const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Expense = require('./models/expense')

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

//路由
app.get('/', (req, res) => {
    Expense.find().lean().then( expenses => res.render('index', {expenses}))
    .catch(error => console.error(error))
})


app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})