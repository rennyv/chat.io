var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('underscore');

app.get('/', function(req, res){
	res.sendFile(__dirname + '\\index.html');
});

app.get('/script.js', function(req, res){
  res.sendFile(__dirname + '\\script.js');
});

io.on('connection', function(socket){
  	console.log("New Connection Detected.");
	var Users = [];
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
		console.log(msg.user + ":" + msg.body)
	});

	socket.on('user activity', function(user){
    	io.emit('user activity', user);
		Users[this.id] = user;
		console.log(user + " has joined")
  	});
	  
	socket.on('disconnect', function(){		
		console.log(Users[this.id] + " has left");
		io.emit('user disconnect', Users[this.id]);
		Users = _.without(Users, this.id);
	})
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});