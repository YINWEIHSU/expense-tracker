const bcrypt = require('bcryptjs')
if (process.env.MODE_ENV !== 'production') {
    require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = {
    name: 'test',
    email: 'test@example.com',
    password: '12345678'
}

const recordList = [
    {
        type: '支出',
        name: '早餐',
        category: '飲食',
        date: '2021-1-20',
        amount: 54,
        remarks: ''
    },
    {
        type: '支出',
        name: '高鐵',
        category: '交通',
        date: '2021-1-29',
        amount: 1490,
        remarks: ''
    },
    {
        type: '支出',
        name: '靈魂急轉彎',
        category: '娛樂',
        date: '2021-1-1',
        amount: 320,
        remarks: ''
    },
    {
        type: '支出',
        name: '蟑螂藥',
        category: '生活',
        date: '2021-2-28',
        amount: 150,
        remarks: ''
    },
    {
        type: '支出',
        name: '股票',
        category: '其他',
        date: '2021-3-4',
        amount: 450000,
        remarks: ''
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
    bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt))
        .then(hash => User.create({
            name: SEED_USER.name,
            email: SEED_USER.email,
            password: hash
        }))
        .then(user => {
            const userId = user._id
            console.log('insert record data now...')
            return Promise.all(Array.from(
                { length: recordList.length }, (_, i) =>
                Record.create({ ...recordList[i], userId }))
            )
        })
        .then(() => {
            console.log('database connection closed...')
            process.exit()
        })
        .catch(error => console.warn('error', error))
    //     Record.create(recordList).then(() => {
    //         console.log('insert record data done...')
    //         return db.close()
    //     }).then(() => {
    //         console.log('database connection closed...')
    //     })
})