const Comment = require('./models/comment.js')

module.exports = (app) => {

    // CREATE
    app.post('/post/:postId/comments', (req, res) => {
        const comment = new Comment(req.body)

        comment
            .save()
            .then(comment => {
                return res.redirect('/')
            })
            .catch(err => {
                console.log("Failed to create a comment and redirect user: ", err)
            })

    })

}
