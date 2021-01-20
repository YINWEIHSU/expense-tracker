const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

function convertToThousands(data) {
    let total = 0
    for (let item of data) {
        total += item.amount
        item.stringAmount = item.amount.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' }).slice(4, -3)
    }
    total = total.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' }).slice(0, -3)

    return { data, total }
}

router.get('/', (req, res) => {
    const categorySelected = req.query.categorySelected
    const userId = req.user._id
    let totalAmount = 0
    if (!categorySelected || categorySelected === '顯示全部') {
        Record.find({ userId }).lean()
            .sort({ date: 'desc' })
            .then(expense => {
                console.log(convertToThousands(expense))

                expense = convertToThousands(expense).data
                totalAmount = convertToThousands(expense).total

                res.render('index', { expense, totalAmount })
            })
            .catch(error => console.error(error))
    } else {
        Record.find({ category: `${categorySelected}`, userId }).lean()
            .sort({ date: 'desc' })
            .then(expense => {

                expense = convertToThousands(expense).data
                totalAmount = convertToThousands(expense).total

                res.render('index', { expense, totalAmount, categorySelected })
            })
            .catch(error => console.error(error))
    }
})

module.exports = router