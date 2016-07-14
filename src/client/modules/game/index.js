var angular = require('angular');
var ngRoute = require('angular-route');
//var chat = require('../chat');

module.exports = angular.module('tanks.game', [ngRoute, 'tanks.chat'])

.config(RouteConfig)



RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
    $routeProvider.when('/game', {
        templateUrl: 'game/game.html',
        controller: gameCtrl
    });
};

function gameCtrl(){
    initGame();
}

// function ChatController($scope,socket, $sce) {
// 	$scope.nam=[];
// 	$scope.mes=[];
// 	$scope.inputMessage='';
// 	$scope.inputName='';

// 	if(socket)
// 	{
// 		socket.on('output', function(data){
// 			var date=new Date();
// 			if(data.length)
// 			{
// 				$scope.sce=$sce;
// 				for(var x=data.length-1;x>=0; x=x-1){
// 					$scope.$apply(function () {
// 						$scope.myHTML += '<div class="chat-message">'+'<p class="chat-name-message" >'+data[x].name+'</p>'+' : '+replaceSmileys(data[x].message)+'<p class="chat-time">'+data[x].time+'</p>'+'</div>';});
// 				}
// 				//$(document.getElementById('chat')).animate({scrollTop: 1000}, 500);
// 			}
// 		});

// 			$scope.sentEventLis=function(event){
// 				var inputMessage = $scope.inputMessage,
// 				name = $scope.inputName;
// 				var date=new Date();

// 				socket.emit('input',{
// 					name: name,
// 					message:inputMessage,
// 					time: date.toUTCString()
// 				});


// 				event.preventDefault();
// 		};
// 	}
// }