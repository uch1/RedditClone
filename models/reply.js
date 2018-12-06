const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Reply = new Schema({
  body: { type: String, required: true }, 
  author: { type: Schema.Types.ObjectId, ref: "User", required: true }
})

module.exports = mongoose.model("Reply", Reply)
