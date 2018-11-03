const Post = require('../models/post')


module.export = app => {

    // CREATE
    app.post('/posts/new', (req, res) => {
        const post = Post(req.body)

        post.save((post, err) => {
            return res.redirect(`/`)
        })
    })

}
