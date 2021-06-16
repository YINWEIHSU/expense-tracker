const express = require('express')
const router = express.Router()
const expenseController = require('../../controller/expenseController')

router.get('/new', expenseController.createExpense)
router.get('/:id/edit', expenseController.editExpense)
router.post('/', expenseController.postExpense)
router.put('/:id', expenseController.putExpense)
router.delete('/:id', expenseController.deleteExpense)

module.exports = router