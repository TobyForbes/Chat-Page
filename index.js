var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

/* Sends a message to the console when a user has connected or distontected from the server (acsesed the webpage) */
io.on('connection', function(socket){ /* Asks itself whether someone has connected */
	console.log('a user connected'); /* Outputs "a user connected" to the console when someone visits the webpage */
	socket.on('disconnect', function(){ /* Asks itself whether someone has disconeccted */
		console.log('a user disconnected'); /* Outputs "a user disconnected" to the console when someone closes the webpage */
	});
});

var timeStamp = Math.floor(Date.now());

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		console.log(msg.pseudo + " " + msg.message + " " + timeStamp); /* adds the username, message and timestamp together with spaces between and outputs it to the console */
		io.emit('chat message', msg);
	});
});

http.listen(3000, function(){ 
	console.log('listening on *:3000'); /* Sends message to the console when the server has sucsessfully been started using a node js terminal*/ 
});

