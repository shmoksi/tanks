// describe('Test Dashboard', function() {
//     var httpBackend, injector, scope, ctrl, $controller;
    

//     var response = [
//         {
//             "_id": "57a",
//             "userImg": {
//                 "image": "pic.jpg",
//                 "description": "Pic"
//             },
//             "isEnabled": true,
//             "isOnline": false,
//             "userPassword": "$2a$10$2iHS.cm",
//             "userEmail": "super@user.com",
//             "userAge": 23,
//             "userName": "superuser",
//             "__v": 0
//         },
//         {
//             "_id": "57e",
//             "userImg": {
//                 "image": "pic2.jpg",
//                 "description": "Pic2"
//             },
//             "isEnabled": true,
//             "isOnline": true,
//             "userPassword": "$2a$10$kvY3zG",
//             "userEmail": "new@user.com",
//             "userAge": 23,
//             "userName": "newuser",
//             "__v": 0
//         }
//     ];

//     beforeEach(angular.mock.module("tanks.dashboard"));

//     // beforeEach(function() {
//     //     inject(function($injector) {
//     //         injector = $injector;
//     //         $httpBackend = $injector.get('$httpBackend');
//     //         $httpBackend.when('GET', 'api/users').respond(response);
//     //     })
//     // });

//     beforeEach(inject(function(_$controller_, $httpBackend) {
//         httpBackend = $httpBackend;
//         $controller = _$controller_;
//         scope = {};
//     }));

//     beforeEach(inject(() => {

//         ctrl = $controller('DashboardCtrl', {$scope: scope, $http: httpBackend});

//     }));

//     afterEach(function() {
//         httpBackend.verifyNoOutstandingExpectation();
//         httpBackend.verifyNoOutstandingRequest();
//     });

//     xit('calls api/users', function() {
//         httpBackend.expectGET('api/users');
//         // injector.get('DashboardCtrl');
//         expect(scope.var1).toEqual(5);
//         httpBackend.flush();
//     });


// });



// // describe("Test profile page", function () {
// //     // var dashboardService, httpBackend;

// //     beforeEach(angular.mock.module("tanks.dashboard"));

// //     beforeEach(inject(function (_$httpBackend_) {
// //         // dashboardService = _dashboardService_;
// //         httpBackend = _$httpBackend_;
// //     }));

// //     fit("check for true or false", function ($routeProvider) {
// //         console.log('a');
// //         console.log($routeProvider());
// //         console.log('b');
// //         const profileURL = 'api/users/profile';

// //         httpBackend.whenRoute('PUT', profileURL + '/updateUser/');
// //         // expect(profileService.update).toBeDefined();
// //     });

// // });
