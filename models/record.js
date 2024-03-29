const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expenseSchema = new Schema({
    type: {
        type: String,
        required: true
    },
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
        type: Date,
        required: true
    },
    merchant: {
        type: String
    },
    remarks: {
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