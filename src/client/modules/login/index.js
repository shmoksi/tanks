var angular = require('angular');
var ngRoute = require('angular-route');

module.exports = angular.module('tanks.login', [
    ngRoute
]).controller('LoginCtrl', ['$scope', '$http', '$uibModalInstance', 'items', '$window',
    function ($scope, $http, $uibModalInstance, items, $window) {
        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.login = function(user) {

            let userInfo = {
                userName: user.name,
                userPassword: user.password
            };

            $http.post('api/users/login', userInfo)
                .then(function(response) {
                        $uibModalInstance.close($scope.selected.item);
                        $window.location.reload();
                    },
                    function(response) {
                        console.log('failed to login');
                    }
                );
        }
    }
]);

// function LoginCtrl($scope, $http, $uibModalInstance, items) {
//     $scope.items = items;
//     $scope.selected = {
//         item: $scope.items[0]
//     };

//     $scope.login = function(user) {

//         let userInfo = {
//             userName: user.name,
//             userPassword: user.password
//         };

//         $http.post('api/users/login', userInfo)
//             .then(function(response) {
//                     $uibModalInstance.close($scope.selected.item);
//                 },
//                 function(response) {
//                     console.log('failed');
//                 }
//             );
//     }
// }