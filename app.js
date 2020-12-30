const express = require('express')
const app = express()
const mongoose = require('mongoose')

const PORT = 3000

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true,  useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
})

//路由
app.get('/', (req, res) => {
    res.send('hello world')
})


app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})