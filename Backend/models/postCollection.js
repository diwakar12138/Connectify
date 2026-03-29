const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    file: {
        type: String
    },
    userId: {
        type: String,
        ref: 'users'
    }
}, { timestamps: true })

module.exports = mongoose.model('posts', postSchema)