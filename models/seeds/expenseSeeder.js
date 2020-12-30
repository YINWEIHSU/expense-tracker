const mongoose = require('mongoose')
const Expense = require('../expense')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true,  useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
    for (let i = 0; i < 10; i++) {
        Expense.create({
            name: 'name' + i,
            kind: '其他',
            amount: Math.floor(Math.random()*100) + 1,
            content: '備註'
        })
    }
    console.log('done')
})
