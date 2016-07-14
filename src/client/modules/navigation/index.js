var angular = require('angular');
var ngRoute = require('angular-route');

module.exports = angular.module('tanks.navigation', [
    ngRoute
])

    .controller('NavigationCtrl', ['$scope', '$http', '$location', '$window', '$uibModal',
        ($scope, $http, $location, $window, $uibModal) => {

            $scope.logged = false;

            $scope.items = [];

            $scope.logInClick = () => {
                const modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'login/login.html',
                    controller: 'LoginCtrl',
                    resolve: {
                        items: () => {
                            return $scope.items;
                        }
                    }
                });
                modalInstance.result.then((selectedItem) => {
                    $scope.selected = selectedItem;
                });
            };

            $scope.logOutClick = () => {
                $http.post('api/users/logout').then((response) => {
                    $window.location.reload();
                });
            };

            $scope.checkSessionFunc = () => {
                $http.get("/api/users/checkSession").then((res) => {
                    console.log(res.data.status == 'success');
                    if (res.data.status === 'success') {
                        console.log('logged in');
                        $scope.logged = true;
                    } else if (res.data.status == 'error'){
                        console.log('NOT logged in');
                        $scope.logged = false;
                    }
                }, () => {
                    console.log('server error');
                });
            };

            $scope.checkSessionFunc();

    }])


    .directive('navigation', function (routeNavigation) {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "navigation/navigation.html",
            controller: function ($scope) {
                $scope.routes = routeNavigation.routes;
                $scope.activeRoute = routeNavigation.activeRoute;
            }
        };
    })

    .directive('navLog', function ($http, routeNavigation, navConstructor) {
        return {
            template: function () {
                return navConstructor.navBuild(true);
            },
            controller: 'NavigationCtrl'
        };
    })

    .directive('navNoLog', function ($http, routeNavigation, navConstructor) {
        return {
            template: function () {
                return navConstructor.navBuild(false);
            },
            controller: 'NavigationCtrl'
        };
    })

    // .service('logCheck', function($http) {
    // 	this.check = function($scope) {
    // 		$http.get("/api/users/checkSession").then(function(res) {
    //             console.log(res.data.status);
    //             if (res.data.status === 'success') {
    //                 console.log('logged in');
    //             } else if (res.data.status === 'error'){
    //                 console.log('NOT logged in');
    //             }
    //         }, function () {
    //             console.log('server error');
    //         });
    // 	};
    // })

    .service('navConstructor', function(routeNavigation){
        this.navBuild = function(logged) {

            let href, name, ngClick = "", icon = "";
            let nav = '<ul class="nav navbar-nav"> ',
                navCenter = '<a href="/game" class="btn btn-danger navbar-center">Start GAME</a>',
                navRight = '<ul class="nav navbar-nav navbar-right"> ';
            if(logged) {
                for(let i = 0; i < routeNavigation.routes.length; i++) {
                    href = ' href="' + routeNavigation.routes[i].template + '"';
                    name = routeNavigation.routes[i].name;

                    if(routeNavigation.routes[i].click !== "") {
                        ngClick = ' ng-click="' + routeNavigation.routes[i].click + '"';
                    }

                    if(routeNavigation.routes[i].icon !== "") {
                        icon = '<span class="glyphicon ' + routeNavigation.routes[i].icon + '"></span> ';
                    }

                    if(routeNavigation.routes[i].log) { //check its working accuracy
                        if(routeNavigation.routes[i].pos === 'left') {
                            nav += ' <li><a' + href + ngClick + '>' + name + '</a></li> ';
                        } else if(routeNavigation.routes[i].pos === 'right'){
                            navRight += ' <li><a' + href + ngClick + '>' + icon + name + '</a></li>';
                        }
                    }
                }
                nav += '</ul> ';
                navRight += '</ul>';

                return nav + navCenter + navRight;
            } else {
                for(let i = 0; i < routeNavigation.routes.length; i++) {
                    href = ' href="' + routeNavigation.routes[i].template + '"';
                    name = routeNavigation.routes[i].name;

                    if(routeNavigation.routes[i].click !== "") {
                        ngClick = ' ng-click="' + routeNavigation.routes[i].click + '"';
                    }

                    if(routeNavigation.routes[i].icon !== "") {
                        icon = '<span class="glyphicon ' + routeNavigation.routes[i].icon + '"></span> ';
                    }

                    if(routeNavigation.routes[i].pos === 'right' && !routeNavigation.routes[i].log) {
                        navRight += ' <li><a' + href + ngClick + '>' + icon + name + '</a></li>';
                    }
                }
                return navRight;
            }
        }
    })


    .factory('routeNavigation', function($route, $location) {
        var routes = [
            {template: 'dashboard', name: 'Dashboard', pos: 'left', icon: '', log: true, click: '' },
            {template: 'scores', name: 'Scores', pos: 'left', icon: '', log: true, click: '' },
            {template: 'about', name: 'About', pos: 'left', icon: '', log: true, click: '' },
            {template: 'profile', name: 'Profile', pos: 'right', icon: 'glyphicon-user', log: true, click: '' },
            {template: '', name: 'Log Out', pos: 'right', icon: 'glyphicon-log-out', log: true, click: 'logOutClick()' },
            {template: 'signup', name: 'Sign Up', pos: 'right', icon: 'glyphicon-plus', log: false, click: '' },
            {template: '', name: 'Log In', pos: 'right', icon: 'glyphicon-log-in', log: false, click: 'logInClick()' }
        ];

        return {
            routes: routes,
            activeRoute: function (route) {
                return route.path === $location.path();
            }
        };
    });
