var app = angular.module("chatApp", [] );

app.controller("chatController", ["$scope", function($scope){
	var socket = io();
	
	$scope.message = {
		user: "",
		body: ""
	};
	
	$scope.messages = [];
	
	$scope.message.user = prompt("What is your name?");
	
	socket.emit('user activity', $scope.message.user);
	
	$scope.sendMessage = function() {
		socket.emit('chat message', $scope.message);
		$scope.message.body = "";
	};	
	
	socket.on('chat message', function(msg){
		$scope.messages.push(msg);
		$scope.$apply();
	});
	
	socket.on('user activity', function(user){
		$scope.messages.push({
			user: "SYSTEM",
			body: "'" + user + "' has joined the chat."
		});
		$scope.$apply();
	});
	
		socket.on('user disconnect', function(user){
		$scope.messages.push({
			user: "SYSTEM",
			body: "'" + user + "' has left the chat."
		});
		$scope.$apply();
	});
	
}]);