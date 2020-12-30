const express = require('express')
const router = express.Router()

const Expense = require('../../models/expense')

router.get('/', (req, res) => {
    Expense.find().lean()
    .sort({_id: 'asc'})
    .then( expenses => res.render('index', {expenses}))
    .catch(error => console.error(error))
})

module.exports = router