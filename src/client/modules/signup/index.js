var angular = require('angular');
var ngRoute = require('angular-route');

module.exports = angular.module('tanks.signup', [
    ngRoute
]).config(RouteConfig)
.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    autoDismiss: false,
    positionClass: 'toast-top-center',
  });
})
.service('sendReg',['$http', '$location', function($http, $location){
	this.add = function(userInfo){
		return $http.post('/api/users/add', userInfo).then(function(res){
			$location.path('/');
		});
	};
}]);


RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
    $routeProvider.when('/signup', {
        controller: SignupCtrl,
        templateUrl: 'signup/signup.html'
    });
};

function SignupCtrl($scope, sendReg, toastr) {
	$scope.maxname = 15;
	$scope.minname = 5;
	$scope.maxpassword = 12;
	$scope.minpassword = 6;
	$scope.maxage = 100;
	$scope.minage = 18;

	$scope.user = {
		name : "",
		age : "",
		email : "",
		password: ""
	};

	$scope.register = function(user){
		let userInfo = {
			userName : user.name,
			userAge : user.age,
			userEmail : user.email,
			userPassword : user.password
		};
		toastr.success('You registered successfully \n and can now log in.', 'Congratulations!', {
            closeButton: true,
            closeHtml: '<button>&times;</button>'
        })
		sendReg.add(userInfo);
	};
};
