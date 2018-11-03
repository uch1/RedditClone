const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Post = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    title: { type: String, required: true },
    url: { type: String, required: true },
    summary: { type: String, required: true }
})

Post.pre('save', (next) => {
    // SET createAt and updatedAt
    const now = new Date()
    this.updatedAt = now

    if (!this.createdAt) {
        this.createdAt = now
    }

    next()
})

module.exports = mongoose.model("Post", Post)
