var angular = require('angular');
var ngRoute = require('angular-route');
var scroll_glue = require('angularjs-scroll-glue');

module.exports = angular.module('tanks.chat', [ ngRoute, 'luegg.directives'])

.controller('ChatController', ChatController)

.directive('chat',function() {
    return {
          restrict: 'C',
          controller: ChatController,
          templateUrl: 'chat/chat.html'
    };
});

function ChatController($scope,socket)
{
     $scope.messages=[];
     $scope.inputMessage='';
     $scope.inputName='';

     if(socket)
     {
          socket.on('output', function(data){
              getMessages(data);
          });

          $scope.sentEventListener=function(event){
               var inputMessage = $scope.inputMessage,
               name = $scope.inputName,
               date=new Date();

               socket.emit('input',{
                    name: name,
                    message:inputMessage,
                    time: date.toUTCString()
               });

               $scope.inputMessage=null;

               event.preventDefault();
          };
     }

     function getMessages(data)
     {
          if(data.length)
          {
               for(var x=data.length-1;x>=0; --x){
                    $scope.$apply(function () {
                         $scope.messages.push({
                              "chater_name": data[x].name, 
                              "chater_message": data[x].message,
                              "chater_time": data[x].time
                         });
                    });
               }
          }
     }
}
