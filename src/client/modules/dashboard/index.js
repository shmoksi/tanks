var angular = require('angular');
var ngRoute = require('angular-route');

module.exports = angular.module('tanks.dashboard', [
    ngRoute
]).config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
    $routeProvider.when('/dashboard', {
        controller: DashboardCtrl,
        templateUrl: 'dashboard/dashboard.html'
    });
};

function DashboardCtrl($scope, $http){
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
        console.log(id);
    }
    console.log("required dashboard!");
}


