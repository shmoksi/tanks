import angular from 'angular';
import ngRoute from 'angular-route';

module.exports = angular.module('tanks.login', [
    ngRoute
])

.service('sendLog',['$http', '$window',
    function($http, $window){

        this.log = (userInfo, $scope, $uibModalInstance, item) => {
            
            return $http.post('/api/users/login', userInfo)
                    .then((response) => {
                        $scope.status = true;
                        $uibModalInstance.close(item);
                        $window.location.reload();
                        window.localStorage.user = response.data.user;
                        window.localStorage.username = response.data.username;
                    },
                    (response) => {
                        window.localStorage.user = null;
                        window.localStorage.username = null;
                        alert('failed to login');
                    });
        };
}])

.controller('LoginCtrl', ['$scope', 'sendLog', '$uibModalInstance', 'item', function($scope, sendLog, $uibModalInstance, item) {

        $scope.status = false;

        $scope.minLengthName = 5;
        $scope.maxLengthName = 15;

        $scope.minLengthPass = 6;
        $scope.maxLengthPass = 12;

        $scope.login = (user) => {

            let userInfo = {
                userName: user.name,
                userPassword: user.password
            };

            sendLog.log(userInfo, $scope, $uibModalInstance, item);
        }
    }
]);
