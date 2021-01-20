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
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    merchant: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        requires: true
    }
})

module.exports = mongoose.model('Record', expenseSchema)