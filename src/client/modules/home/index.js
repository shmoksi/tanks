var angular = require('angular');
var ngRoute = require('angular-route');

module.exports = angular.module('tanks.home', [
    ngRoute
]).config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
    $routeProvider.when('/', {
        controller: MainCtrl,
        templateUrl: 'home/home.html'
    });
};

function MainCtrl($scope, $uibModal, $log, $location, $http, $window) {

    //<------------slider------------->
    // $scope.myInterval = 2000;
    // $scope.noWrapSlides = false;
    // $scope.active = 0;
    // $scope.noPause = false;
    //
    // var slides = $scope.slides = [];
    // var currIndex = 0;
    //
    // $scope.addSlide = function(imageNum) {
    //     slides.push({
    //         image: 'public/images/home_' + imageNum + '.png',
    //         id: currIndex++
    //     });
    // };
    //
    // for (var i = 0; i < 3; i++) {
    //     $scope.addSlide("0" + (i + 1));
    // }
}
