const express = require('express')
const router = express.Router()

const Record = require('../../models/expense')

router.get('/new', (req, res) => {
  return res.render('new')
})
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id).lean()
    .then(expense => res.render('edit', { expense }))
    .catch(error => console.log(error))
})
router.post('/', (req, res) => {
  return Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(expense => {
      expense = Object.assign(expense, req.body)
      return expense.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router