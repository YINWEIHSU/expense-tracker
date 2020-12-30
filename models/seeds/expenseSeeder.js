const Expense = require('../expense')
const db = require('../../config/mongoose')

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
