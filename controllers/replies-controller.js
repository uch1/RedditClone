var Post = require("../models/post")
var Comment = require("../models/comment")
var User = require("../models/user")

module.exports = app => {
  // NEW REPLY
  app.get("/posts/:postId/comments/:commentId/replies/new", (req, res) => {
    let post;
    Post.findById(req.params.postId)
      .then(p => {
        console.log(">>>>> " + req.params.postId)

        post = p;
        return Comment.findById(req.params.commentId);
      })
      .then(comment => {
        console.log("Post Object: ", post)
        res.render("replies-new", { post, comment });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // CREATE REPLY
  app.post("/posts/:postId/comments/:commentId/replies", (req, res) => {
    let newComment = new Comment(req.body)
    console.log("NEW COMMENT " + newComment)
    Comment.findById(req.params.commentId)
            .then(comment => {
              comment.replies.unshift(newComment)
              comment.save()
              newComment.save()
              res.redirect(`/posts/${req.params.postId}`)
            }).catch(error => {
              console.log(error.message)
            })
    // // LOOKUP THE PARENT POST
    // Post.findById(req.params.postId)
    // .then(post => {
    //   // FIND THE CHILD COMMENT
    //   var comment = post.comments.id(req.params.commentId);
    //   // ADD THE REPLY
    //   comment.replies.unshift(req.body);
    //   // SAVE THE CHANGE TO THE PARENT DOCUMENT
    //   return post.save();
    // })
    // .then(post => {
    //   // REDIRECT TO THE PARENT POST#SHOW ROUTE
    //   res.redirect(`/posts/${post._id}`);
    // })
    // .catch(err => {
    //   console.log("[/posts/:postId/comments/:commentId/replies] Failed to create reply: ",err.message);
    // });
  });
}











