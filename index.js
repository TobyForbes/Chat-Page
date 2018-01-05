var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

/**io.on('connection', function(socket){
	console.log('a user connected');
});*/

/* Sends a message to the console when a user has connected or distontected from the server (acsesed the webpage) */
io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnect'); 
	});
});

var timeStamp = Math.floor(Date.now());

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		console.log(msg.pseudo + " " + msg.message + timeStamp);
		io.emit('chat message', msg);
		//console.log('message: ' + msg);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000'); /* Sends message to the console when the server has sucsessfully been started using a node js terminal*/ 
});

