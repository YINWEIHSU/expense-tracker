const Record = require('../expense')
const db = require('../../config/mongoose')

const recordList = [
    {
        name: '早餐',
        category: '飲食',
        date: '2020-12-20',
        amount: 54,
    },
    {
        name: '高鐵',
        category: '交通',
        date: '2020-12-29',
        amount: 1490,
    },
    {
        name: '靈魂急轉彎',
        category: '娛樂',
        date: '2021-1-1',
        amount: 320,
    },
    {
        name: '蟑螂藥',
        category: '生活',
        date: '2020-12-28',
        amount: 150,
    },
    {
        name: '股票',
        category: '其他',
        date: '2021-1-4',
        amount: 450000,
    }
]

// db.once('open', () => {
//     console.log('mongodb connected!')
//     recordList.forEach(record => Record.create(record).then(() => {
//         console.log('Insert seed')
//     }))
//     setTimeout(() => db.close(), 1000)
// })

db.once('open', () => {
    Record.create(recordList).then(() => {
        console.log('insert record data done...')
        return db.close()
    }).then(() => {
        console.log('database connection closed...')
    })
})