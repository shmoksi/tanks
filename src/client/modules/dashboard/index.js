import angular from 'angular';
import ngRoute from 'angular-route';

module.exports = angular.module('tanks.dashboard', [
    ngRoute
])
.controller('DashboardCtrl', ['$scope', '$http', 'socket', function($scope, $http, socket) {
    $scope.var1 = 5;

    $http.get('api/users').then(function(response){
        var users = response.data.users,
            id = response.data.sessionId;

        users.forEach(function(value, index) {
            if (value._id == id) {
                delete users[index];
            }
        });
        $scope.users = users;
    });

    $scope.sendInvite = function(id){
        // console.log('INVITE ID:', id);
        socket.emit('invite', { target_user: id });
    }
    console.log("required dashboard!");
}])
.config(RouteConfig);



RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
    $routeProvider.when('/dashboard', {
        controller: 'DashboardCtrl',
        templateUrl: 'dashboard/dashboard.html'
    });
}
