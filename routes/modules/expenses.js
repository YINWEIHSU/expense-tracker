const express = require('express')
const router = express.Router()

const Expense = require('../../models/expense')

router.get('/new', (req,res) => {
    return res.render('new')
})
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Expense.findById(id).lean()
    .then(expense => res.render('edit', {expense}))
    .catch(error => console.log(error))
})
router.post('/', (req, res) => {
    return Expense.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
    const id = req.params.id
    // const {name, kind, amount, content} = req.body
    return Expense.findById(id)
    .then(expense => {
        // expense.name = name
        // expense.kind = kind
        // expense.amount = amount
        // expense.content = content
        expense = Object.assign(expense, req.body)//筆記
        return expense.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Expense.findById(id)
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router