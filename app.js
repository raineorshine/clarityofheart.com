var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.set('view engine', 'jade')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser())

// accept all paths for client-side routing
app.get('*', function(req, res) {
	res.render('index')
})

var server = app.listen(process.env.PORT || 8420, function() {
	console.log('Express server listening on port ' + server.address().port)
})
