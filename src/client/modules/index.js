import angular from 'angular';
import home from './home';
import game from './game';
import chat from './chat';
import login from './login';
import signup from './signup';
import profile from './profile';
import dashboard from './dashboard';
import navigation from './navigation';
import service from './serviceSendData';

module.exports = angular.module('tanks', [
    require('angular-route'),
    require('angular-animate'),
    require('ng-file-upload'),
    require('angular-ui-bootstrap'),
    require('angular-toastr'),
    require('angular-sanitize'),
    dashboard.name,
    game.name,
    chat.name,
    home.name,
    login.name,
    signup.name,
    profile.name,
    navigation.name,
    service.name
]).config(RouteConfig)
.factory('socket', ['$rootScope', function($rootScope) {
    var socket = io.connect();

  socket.on('connect', function() {
    socket.emit('auth', {
        user: window.localStorage.user,
        username: window.localStorage.username
    });
  });

  socket.on('you-are-invited', function(data) {
      var result = confirm('Wanna play with ' + data.sender_username + '?');
      // Send reply based on result!
  });

  return {
    on: function(eventName, callback){
      socket.on(eventName, callback);
    },
    emit: function(eventName, data) {
      socket.emit(eventName, data);
    }
  };
}]);


RouteConfig.$inject = ['$routeProvider', '$locationProvider'];
function RouteConfig($routeProvider, $locationProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
}
