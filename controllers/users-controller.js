const User = require('./models/user')

module.exports = (app) => {

  // Show user's profile 
  app.get('/:username', (req, res) => {
    const currentUser = req.user 

    User.find({username: req.paramas.username})
        .populate('posts')
        .populate('comments')
        .then(user => {
          res.render('profile-show', { user, currentUser })
        })
  })
  
}