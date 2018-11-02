// Node Libraries
const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const server = express()
server.use(bodyParser.urlencoded({ extended: true }))
server.use(methodOverride('_method'))
server.use(express.static('public'))
server.engine('handlebars', exphbs({ defaultLayout: 'main'}))
server.set('view engine', 'handlebars')

// Restful Routes

server.get('/', (req, res) => {
    var message = "Hello Uchenna Aguocha, How is your day?"
    res.render('layouts/main', { message: message } )
    console.log("Hello Uchenna")
})

server.listen(3000, () => {
    console.log('App listening on port 3000')
})

// Exports
module.export = server
