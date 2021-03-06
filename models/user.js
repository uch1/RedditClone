const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema


const User = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    username: { type: String, required: true },
    password: { type: String, select: false },
    posts : [{ type: Schema.Types.ObjectId, ref: "Post" }]
})

User.pre("save", function(next) {
  // SET createdAt AND updatedAt
  var now = new Date()
  this.updatedAt = now
  if (!this.createdAt) {
    this.createdAt = now
  }

  // ENCRYPT PASSWORD
  var user = this
  if (!user.isModified("password")) {
    return next()
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash
      next()
    })
  })
})


User.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model("User", User);
