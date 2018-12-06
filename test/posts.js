const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp)

var agent = chai.request.agent(server)

const Post = require('./models/post')

// How many posts are there now?
// Make a request to create another
// Check that the database has one more post in it
// Check that the response is a successful

describe("Post", () => {
    it("should create with valid attributes at POST /posts", done => {
        Post.find((err, posts) => {
            var postCount = posts.count

            var post = { title: "post title", url: "https://www.google.com", summary: "post summary" }

            chai
                .request("localhost:3000")
                .post("/posts")
                .send(post)
                .then(res => {
                    Post.find((err, posts) => {
                        postCount.should.be.equal(posts.length - 1)
                        res.should.have.status(200)
                        return done()
                    })
                })
                .catch(err => {
                    return done(err)
                })
        })
    })
})


describe("Post", () => {
    it("should delete a post before running a test ", done => {
        var post = { title: "post title", url: "https://www.google.com", summary: "post summary" };

        Post.findOneAndRemove(post, function() {
          Post.find(function(err, posts) {
            var postCount = posts.count;
            chai
              .request("localhost:3000")
              .post("/posts")
              .send(post)
              .then(res => {
                Post.find(function(err, posts) {
                  postCount.should.be.equal(posts.length + 1);
                  res.should.have.status(200);
                  return done();
                });
              })
              .catch(err => {
                return done(err);
              });
          });
        });
    })
})
