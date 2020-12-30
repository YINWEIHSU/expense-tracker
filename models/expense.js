const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expenseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    kind: {
        type: String,
        required: true
    },
    content: {
        type: String
    }
})

module.exports = mongoose.model('Expense', expenseSchema)