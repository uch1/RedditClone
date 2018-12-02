// NODE LIBRARIES
const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const expressValidator = require('express-validator')
var cookieParser = require('cookie-parser')
const server = express()

var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
      req.user = null;
    } else {
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
    }
  
    next();
  };

// BODY PARSER
server.use(checkAuth)
server.use(cookieParser())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(expressValidator())

server.use(methodOverride('_method'))
server.use(express.static('public'))
server.engine('handlebars', exphbs({ defaultLayout: 'main'}))
server.set('view engine', 'handlebars')



// RESTFUL ROUTES

server.get('/', (req, res) => {
    var message = "Hello Uchenna Aguocha, How is your day?"
    res.render('posts-index', { message: message } )
    console.log("Hello Uchenna")
    console.log("Cookie Request: ", req.cookies)
})

server.listen(3000, () => {
    console.log('App listening on port 3000')
})

// ROUTERS
require('./controllers/posts-controller.js')(server)
require('./controllers/comments-controller.js')(server)
require('./controllers/auth-controller.js')(server)

// SET DATABASE
require('./data/reddit-clone-db')

// Exports
module.exports = server
