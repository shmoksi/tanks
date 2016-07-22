import angular from 'angular';
import ngRoute from 'angular-route';

module.exports = angular.module('tanks.navigation', [
    ngRoute
])

    .controller('NavigationCtrl', ['$scope', '$http', '$location', '$window', '$uibModal',
        ($scope, $http, $location, $window, $uibModal) => {

            $scope.logged = false;
            $scope.item = {};

            $scope.logInClick = () => {
                const modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'login/login.html',
                    controller: 'LoginCtrl',
                    resolve: {
                        item: () => {
                            return $scope.item;
                        }
                    }
                });
                console.log(modalInstance.result);
                modalInstance.result.then((selectedItem) => {
                    $scope.selected = selectedItem;
                });
            };

            $scope.logOutClick = () => {
                $http.post('/api/users/logout').then((response) => {
                    if (response.data.status === 'success') {
                        return $window.location.reload();
                    }
                    console.log('server error');
                });
            };

            $scope.checkSessionFunc = () => {
                $http.get("/api/users/checkSession").then((res) => {
                    if (res.data.status === 'success') {
                        $scope.logged = true;
                        return;
                    }
                    $scope.logged = false;
                    window.localStorage.user = null;
                    window.localStorage.username = null;
                }, () => {
                    alert('server error');           //-------------> will be OK?
                });
            };

            $scope.checkSessionFunc();

    }])


    .directive('navigation', (routeNavigation) => {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "navigation/navigation.html",
            controller: ($scope) => {
                $scope.routes = routeNavigation.routes;
                $scope.activeRoute = routeNavigation.activeRoute;
            }
        };
    })

    .directive('navLog', ($http, routeNavigation, navConstructor) => {
        return {
            template: () => {
                return navConstructor.navBuild(true);
            },
            controller: 'NavigationCtrl'
        };
    })

    .directive('navNoLog', ($http, routeNavigation, navConstructor) => {
        return {
            template: () => {
                return navConstructor.navBuild(false);
            },
            controller: 'NavigationCtrl'
        };
    })

    .service('navConstructor', function (routeNavigation) {
        this.navBuild = (logged) => {

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


    .factory('routeNavigation', ($route, $location) => {
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
            activeRoute: (route) => {
                return route.path === $location.path();
            }
        };
    });
