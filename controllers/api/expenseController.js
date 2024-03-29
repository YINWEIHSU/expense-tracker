const Record = require('../../models/record')

const expenseController = {
  getExpenses: (req, res) => {
    const userId = req.user._id
    Record.find({ userId })
      .sort({ date: 'desc' })
      .then(expense => {
        res.json(expense)
      })
      .catch(error => console.error(error))
  },
  postExpense: (req, res) => {
    req.body.userId = req.user._id
    if (req.body.type === 'expense') {
      req.body.amount = Math.abs(Number(req.body.amount)) * -1
    }
    Record.create(req.body)
      .then(() => res.status(401).json({ status: 'success', message: '成功新增紀錄' }))
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
      .then(() => res.status(401).json({ status: 'success', message: '成功修改紀錄' }))
      .catch(error => console.log(error))
  },
  deleteExpense: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Record.findOne({ _id, userId })
      .then(expense => expense.remove())
      .then(() => res.status(401).json({ status: 'success', message: '成功刪除紀錄' }))
      .catch(error => console.log(error))
  }
}
module.exports = expenseController