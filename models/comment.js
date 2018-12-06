const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    replies: [{ type: Schema.Types.ObjectId, ref: "Reply", require: true }]
})

module.exports = mongoose.model("Comment", Comment)
