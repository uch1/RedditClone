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
                var token = jwt.sign( { _id: user._id }, process.env.SECRET, { expires: "60 days"})
                res.cookie('nToken', token, { maxAge: 900000, httpOnly: true })
                res.redirect('/')
            })
            .catch(err => {
                console.log(err.message)
                return res.status(400).send({err: err})
            })
        // newUser.save(function (err) {
        //     if (err) console.log(err)
        //     // saved!
        //     const token = jwt.sign({ _id: newUser._id }, 'shhhhhhared-secret')
        //     res.render
        // })
    })

    // LOGOUT 
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken')
        res.redirect('/')
    }) 
}
