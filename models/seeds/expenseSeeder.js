const Record = require('../expense')
const db = require('../../config/mongoose')

db.once('open', () => {
    console.log('mongodb connected!')
    for (let i = 0; i < 10; i++) {
        Record.create({
            name: 'name' + i,
            category: '其他',
            amount: Math.floor(Math.random()*100) + 1,
            date: '2020-12-31'
        })
    }
    console.log('done')
})
