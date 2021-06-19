const Record = require('../../models/record')

const expenseController = {
  createExpense: (req, res) => {
    return res.render('new')
  },
  editExpense: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Record.findOne({ _id, userId }).lean()
      .then(expense => res.render('edit', { expense }))
      .catch(error => console.log(error))
  },
  postExpense: (req, res) => {
    req.body.userId = req.user._id
    if (req.body.type === 'expense') {
      req.body.amount = Math.abs(Number(req.body.amount)) * -1
    }
    console.log(req.body)
    return Record.create(req.body)
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  },
  putExpense: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Record.findOne({ _id, userId })
      .then(expense => {
        expense = Object.assign(expense, req.body)
        return expense.save()
      })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  },
  deleteExpense: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Record.findOne({ _id, userId })
      .then(expense => expense.remove())
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  }
}
module.exports = expenseController