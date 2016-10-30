var express = require('express'),
    bp      = require('body-parser'),
    path    = require('path')
    PORT    = 8100

var app     = express()
app.use(express.static(__dirname + '/client/static'))
app.use(express.static(__dirname + '/client/partials'))
app.use(express.static(__dirname + '/bower_components'))
app.use(bp.urlencoded({extended: true}))
app.use(bp.json())

require(path.join(__dirname, '/server/config/db'))

var routes  = require('./server/config/routes')
routes(app)

app.listen(PORT, function(){
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log(`Server is up. Listening on port ${PORT}`)
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
})
