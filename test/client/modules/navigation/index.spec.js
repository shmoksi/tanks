describe('NavigationCtrl » Testing navpanel', () => {
    let ctrl,
        scope,
        $window,
        uibModal,
        $httpBackend,
        createController;

    beforeEach(angular.mock.module('tanks.navigation'));

    beforeEach(inject(($controller, _$httpBackend_, $location, _$window_, $http) => {
        scope = {};
        uibModal = {};
        $window = _$window_;
        $httpBackend = _$httpBackend_;
        spyOn($window.location, 'reload')

        createController = function() {
            return $controller('NavigationCtrl', {
                $scope: scope, $http: $http, $location: $location, $window: $window, $uibModal: uibModal
            });
        }
    }));

    it("check initial variables", () => {
        let ctrl = createController();
        expect(scope.items).toBeDefined();
        expect(scope.logged).toBe(false);
    });

    it("check session", () => {
        let url = '/api/users/checkSession',
            ctrl = createController();

        /* When user online */
        $httpBackend.whenGET(url).respond({status: 'success'});
        $httpBackend.expectGET(url);
        scope.checkSessionFunc();
        $httpBackend.flush();
        expect(scope.logged).toBe(true);

        /* When user offline */
        $httpBackend.expectGET(url).respond({status: 'error'});
        scope.checkSessionFunc();
        $httpBackend.flush();
        expect(scope.logged).toBe(false);

        /* When server error */
        $httpBackend.expectGET(url).respond('');
        scope.checkSessionFunc();
        $httpBackend.flush();
        expect(scope.logged).toBe(false);

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("logout user", () => {
        let urlSession = '/api/users/checkSession',
            urlLogout = '/api/users/logout',
            ctrl = createController();

        $httpBackend.whenGET(urlSession).respond({status: 'success'});
        $httpBackend.expectGET(urlSession);

        $httpBackend.whenPOST(urlLogout).respond({status: 'success'});
        $httpBackend.expectPOST(urlLogout);
        scope.logOutClick();
        $httpBackend.flush();
        expect($window.location.reload.calls.count()).toEqual(1);

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});
