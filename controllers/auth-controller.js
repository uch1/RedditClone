const User = require('./models/user')
const jwt = require('jsonwebtoken')

module.exports = (app) => {

    app.get('/sign-up', (req, res) => {
        console.log("Auth Controller: " + req.body)
    })

    app.post('/sign-up', (req, res) => {
        console.log("Post request", req.body)

        const newUser = new User(req.body);

        newUser.save(function (err) {
            if (err) console.log(err)
            // saved!
            const token = jwt.sign({ _id: newUser._id }, 'shhhhhhared-secret')
            res.render
        })
    })
}
