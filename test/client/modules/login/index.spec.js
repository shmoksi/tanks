describe('LoginCtrl', function() {

    // let $scope, $controller, $httpBackend, sendLog, createController;
    // let controller;
    //
    // const $uibModalInstance = {},
    // 		item = {};
    // const userInfo = {
	// 	userName: "Jack",
	// 	userPassword: "Black"
	// };
    //
    //
    // beforeEach(angular.mock.module("tanks.login"));
    //
    // beforeEach(inject((_$controller_, _sendLog_) => {
    // 	$scope = {};
    // 	$controller = _$controller_;
    //     sendLog = _sendLog_;
    // }));
    //
    // beforeEach(inject(() => {
    //     $uibModalInstance.close = () => {
    //
    //     };
    //
    //     createController = () => {
	//        return $controller('LoginCtrl', {'$scope': $scope, 'sendLog': sendLog, '$uibModalInstance': $uibModalInstance, 'item': item});
	//     };
    // }));
    //
    // describe('Testing sendLog service', () => {
    //
	// 	beforeEach(inject((_$httpBackend_) => {
	//         $httpBackend = _$httpBackend_;
	//     }));
    //
    //     afterEach(() => {
	// 	     $httpBackend.verifyNoOutstandingExpectation();
	// 	     $httpBackend.verifyNoOutstandingRequest();
	//    	});
    //
	//    	it('$scope.status should be false', () => {
	//    		controller = createController();
	//    		expect($scope.status).toBe(false);
	//    	});
    //
    //     it('$scope.status should be true', () => {
    //     	controller = createController();
    //
    //         $httpBackend.expectPOST('/api/users/login').respond(200, {});
    //         sendLog.log(userInfo, $scope, $uibModalInstance, item);
    //         $httpBackend.flush();
    //
    //         expect($scope.status).toBe(true);
    //     });
    //
    // });
    //
    //
    // describe('Testing controller', () => {
    //
    //     it('minLengthName', () => {
    //     	controller = createController();
    //
    //         expect($scope.minLengthName).toEqual(5);
    //         expect($scope.minLengthName).not.toEqual(6);
    //     });
    //
    //     it('maxLengthName', () => {
    //     	controller = createController();
    //
    //         expect($scope.maxLengthName).toEqual(15);
    //         expect($scope.maxLengthName).not.toEqual(12);
    //     });
    //
    //     it('minLengthPass', () => {
    //     	controller = createController();
    //
    //         expect($scope.minLengthPass).toEqual(6);
    //         expect($scope.minLengthPass).not.toEqual(5);
    //     });
    //
    //     it('maxLengthPass', () => {
    //     	controller = createController();
    //
    //         expect($scope.maxLengthPass).toEqual(12);
    //         expect($scope.maxLengthPass).not.toEqual(15);
    //     });
    //
    //     it("$scope.login should call sendLog.log", () => {
    //     	controller = createController();
	// 		sendLog.log = jasmine.createSpy('sendLog.log spy');
    //
    //         $scope.login(userInfo);
    //
    //         expect(sendLog.log).toHaveBeenCalled();
    //     });
    //
    // });

});
