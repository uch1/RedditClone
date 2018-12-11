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
                    res.redirect(`/posts/${post._id}`)
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
    app.get('/posts/:postId', (req, res) => {
        // Look up the post
        const currentUser = req.user 

        Post.findById(req.params.postId)
            .populate('comments')
            // .populate({ path: 'comments', populate: {path: 'author'} })
            .then(post => {
                console.log("CURRENT POST " + post)

                res.render("post-show", { post: post})
            })
            .catch(err => {
                console.log("[/posts/:id] Failed to show a post: ", err.message)
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

    // UPVOTE 
    app.put("/posts/:id/vote-up", (req, res) => {
        Post.findById(req.params.id)
            .exec((err, post) => {
                if (err) {
                    return res.status(400)
                }

                post.voteScore += 1 
                post.save()
                return res.status(200) // Up Voting was succesful 
            });
    });

    // DOWNVOTE 
    app.put("/posts/:id/vote-down", (req, res) => {
        Post.findById(req.params.id)
            .exec((err, post) => {
                if (err) {
                    return res.status(400)
                }
                post.voteScore -= 1
                post.save()
                return res.status(200) // Down voting was successful
            })
    })

    // SHOW A NEW POST
    // app.get('/posts/new', (req, res) => {
    //     res.render('layouts/posts-new')
    // })
}






