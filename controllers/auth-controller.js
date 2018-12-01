const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = (app) => {

    app.get('/sign-up', (req, res) => {
        console.log("Auth Controller: " + req.body)
        res.render("sign-up")
    })

    app.post('/sign-up', (req, res) => {
        console.log("Post request", req.body)

        const user = new User(req.body);

        user
            .save()
            .then(user => {
                res.redirect('/')
            })
            .catch(err => {
                console.log(err.message)
            })
        // newUser.save(function (err) {
        //     if (err) console.log(err)
        //     // saved!
        //     const token = jwt.sign({ _id: newUser._id }, 'shhhhhhared-secret')
        //     res.render
        // })
    })
}
