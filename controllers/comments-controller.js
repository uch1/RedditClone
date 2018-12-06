const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports = (app) => {

    // CREATE
    app.post('/posts/:postId/comments', (req, res) => {
        const comment = new Comment(req.body)

        comment
            .save()
            .then(comment => {
                return Post.findById(req.params.postId)
            })
            .then(post => {
                post.comments.unshift(comment)
                post.save()
                return res.redirect(`/posts/${req.params.postId}`)
            })
            .catch(err => {
                console.log("Failed to create a comment and redirect user: ", err.meassage)
            })
    })

    

}
