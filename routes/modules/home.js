const express = require('express')
const router = express.Router()

const Record = require('../../models/expense')

router.get('/', (req, res) => {
    const categorySelected = req.query.categorySelected
    let totalAmount = 0
    if (!categorySelected || categorySelected === '顯示全部') {
        Record.find().lean()
            .sort({ date: 'desc' })
            .then(expense => {
                for (let item of expense) {
                    totalAmount += item.amount
                }
                totalAmount = totalAmount.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' }).slice(0, -3)
                res.render('index', { expense, totalAmount })
            })
            .catch(error => console.error(error))
    } else {
        Record.find({ category: `${categorySelected}` }).lean()
            .sort({ date: 'desc' })
            .then(expense => {
                for (let item of expense) {
                    totalAmount += item.amount
                }
                totalAmount = totalAmount.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' }).slice(0, -3)
                res.render('index', { expense, totalAmount, categorySelected })
            })
            .catch(error => console.error(error))
    }

})

module.exports = router