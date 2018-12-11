const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment"}]
})

Comment.pre('find', function(next) {
    this.populate('replies')
    next()
})

module.exports = mongoose.model("Comment", Comment)
