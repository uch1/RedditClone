const Post = require('../models/post')


module.export = app => {

    // CREATE
    app.post('/posts/new', (req, res) => {
        const post = Post(req.body)

        post.save((post, err) => {
            return res.redirect(`/`)
        })
    })

    app.get('/', (req, res) => {
        Post.find({}).then(posts => {
            res.render("layouts/posts-index", { posts: posts })
        }).catch(err => {
            console.log("Failed to render posts-index: ", err.message)
        })
    })

}
