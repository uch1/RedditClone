const Post = require('../models/post')
const User = require('../models/user')

module.exports = (app) => {

    // CREATE
    app.post('/posts', (req, res) => {
        if (req.user) {
            console.log('hitting route: /posts')

            const post = new Post(req.body)
            post.author = req.user._id 

            post.save()
                .then(post => {
                    return User.findById(req.user._id)
                })
                .then(user => {
                    user.posts.unshift(post)
                    user.save()
                    // Redirect to the new post 
                    res.redirect(`/post/${post._id}`)
                })
                .catch(err => {
                    console.log("[/posts] Failed to create a post. Error message: ", err.message)
                })
        } else {
            return res.status(401) // Unauthorized 
        }
    })

    // SHOW Post Form
    app.get('/posts/new', (req, res) => {
        if (req.user) {
            console.log('hitting route: /posts/new')
            res.render('posts-new')
        } else {
            return res.status(401) // Unauthorized
        }
        
    })

    // INDEX
    app.get('/', (req, res) => {
        var currentUser = req.user 

        Post.find({}).then(posts => {
            res.render("posts-index", { posts: posts, currentUser })
        }).catch(err => {
            console.log("Failed to render posts-index: ", err.message)
        })
    })

    // SHOW ONE POST
    app.get('/posts/:id', (req, res) => {
        // Look up the post
        const currentUser = req.user 

        console.log('hitting post :id')
        Post.findById(req.params.id)
            .populate('author')
            .populate({ path: 'comments', populate: {path: 'author'} })
            .then(post => {
                res.render("post-show", { post: post, currentUser })
            })
            .catch(err => {
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
            console.log("Failed to get a subreddit: ", err);
          });
    });

    // SHOW A NEW POST
    // app.get('/posts/new', (req, res) => {
    //     res.render('layouts/posts-new')
    // })

}
