const Post = require('../models/post')


module.exports = (app) => {

    // CREATE
    app.post('/posts', (req, res) => {
        console.log('hitting route: /posts')
        const post = Post(req.body)
        post.save((post, err) => {
            return res.redirect(`/`)
        })
    })

    // SHOW Post Form
    app.get('/posts/new', (req, res) => {
        console.log('hitting route: /posts/new')
        res.render('posts-new')
    })

    // INDEX
    app.get('/', (req, res) => {
        Post.find({}).then(posts => {
            res.render("posts-index", { posts: posts })
        }).catch(err => {
            console.log("Failed to render posts-index: ", err.message)
        })
    })

    // SHOW ONE POST
    app.get('/posts/:id', (req, res) => {
        // Look up the post
        console.log('hitting post :id')
        Post.findById(req.params.id).then(post => {
            res.render("post-show", { post: post })
        }).catch(err => {
            console.log("Failed to show a post: ", err.message)
        })
    })

    // SUBREDDIT
    app.get("/n/:subreddit", function(req, res) {
        Post.find({ subreddit: req.params.subreddit })
          .then(posts => {
            res.render("posts-index", { posts: posts });
          })
          .catch(err => {
            console.log(err);
          });
    });

    // SHOW A NEW POST
    // app.get('/posts/new', (req, res) => {
    //     res.render('layouts/posts-new')
    // })

}
