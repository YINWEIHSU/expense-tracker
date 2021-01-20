const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/new', (req, res) => {
  return res.render('new')
})
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId }).lean()
    .then(expense => res.render('edit', { expense }))
    .catch(error => console.log(error))
})
router.post('/', (req, res) => {
  req.body.userId = req.user._id
  return Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(expense => {
      expense = Object.assign(expense, req.body)
      return expense.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router