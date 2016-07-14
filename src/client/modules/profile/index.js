const angular = require('angular');
const ngRoute = require('angular-route');
module.exports = angular.module('tanks.profile', [
    ngRoute
]).config(RouteConfig)

    .service('profileService', ['$http', function ($http) {
        let userId = '';
        const profileURL = 'api/users/profile';
        this.getProfile = () => {
            return $http.get(profileURL);
        };
        this.getPublicImages = () => {
            return $http.get(profileURL + '/publicImages');
        };
        this.deleteAccount = () => {
            return $http.put(profileURL + '/delete/', {id: userId});
        };

        this.update = (userInfo) => {
            return $http.put(profileURL + '/updateUser/', userInfo).then(function () {
            });
        }
    }])
    .controller('uploadController', ['$http', 'Upload', '$scope', '$uibModalInstance', function ($http, Upload, $scope, $uibModalInstance) {
        $scope.submit = () => {
            let uploadedImg;
            if ($scope.upload_form.file.$valid && $scope.file) {
                //check if from is valid
                $scope.upload($scope.file);
            }
        };
        $scope.upload = (file) => {
            Upload.upload({
                url: 'api/users/profile/upload',
                data: {file: file}
            }).then((resp) => {
                uploadedImg = resp.data;
                $uibModalInstance.close(uploadedImg);
            });
        };
        $scope.cancel = () => {
            $uibModalInstance.dismiss('cancel');
        };

    }])
    .controller('deleteUserController', ['$scope', '$uibModalInstance', ($scope, $uibModalInstance) => {
        $scope.ok = () => {
            $uibModalInstance.close();
        };
        $scope.cancel = () => {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .controller('avatarController', ['$http', '$scope', '$uibModalInstance', '$uibModal', 'profileService', function ($http, $scope, $uibModalInstance, $uibModal, profileService) {
        $scope.images = [];
        $scope.customImages = [];
        profileService.getPublicImages().then((res) => {
            $scope.images = res.data;
            $scope.setCurrentImage($scope.images[0]);
        }).catch((err) => {
            console.log(err);
        });

        $scope.setCurrentImage = (image) => {
            $scope.currentImage = image;
        };

        $scope.ok = () => {
            $uibModalInstance.close($scope.currentImage);
        };

        $scope.cancel = () => {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.uploadPhoto = () => {

            const uploadInstance = $uibModal.open({
                animation: true,
                templateUrl: 'profile/uploadContent.html',
                controller: 'uploadController'
            });
            uploadInstance.result.then((img) => {
                $scope.customImages = [];
                $scope.customImages.push(img);
                $scope.setCurrentImage(img);

            })

        };

    }]),


    RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
    $routeProvider.when('/profile', {
        controller: manageProfileController,
        templateUrl: 'profile/manageProfile.html'
    });
};

function manageProfileController($scope, $uibModal, profileService, toastr, $location) {
    $scope.emailStatus = true;
    $scope.nameMinLength = 5;
    $scope.nameMaxLength = 15;
    $scope.passMinLength = 6;
    $scope.passMaxLength = 12;
    $scope.selectedImg = "api/users/profile/getImage/userAvatar" + getSalt();

    $scope.user = {
        userName: "",
        userImg: {},
        userEmail: "",
        userPassword: "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        userAge: ""
    };

    function getSalt() {
        return "?salt=" + new Date().getTime();
    };

    function savingMsg() {
        toastr.success('Your changes are saved!', 'Message', {
            closeButton: true,
            closeHtml: '<button>&times;</button>'
        });
    };
    function avatarMsg() {
        toastr.warning('Do not forget to save changes!!', 'Message', {
            closeButton: true,
            closeHtml: '<button>&times;</button>'
        });
    };

    let init = () => {
        profileService.getProfile().then( (resp) => {
            $scope.user = resp.data;
        });
    };

    init();

    $scope.saveChanges = (user) => {
        let userInfo = {};
        userInfo = {
            userName: user.userName,
            userAge: user.userAge,
            userEmail: user.userEmail,
            userImg: user.userImg
        };
        if (user.oldPassword) {

            userInfo.userOldPassword = user.oldPassword;
            userInfo.userNewPassword = user.newPassword;
            userInfo.userConfPassword = user.newPassword;

        };
        profileService.update(userInfo);
        savingMsg();

    };

// Delete popup window;
    $scope.deleteUser = () => {

        const deleteInstance = $uibModal.open({
            animation: true,
            templateUrl: 'profile/DeleteContent.html',
            controller: 'deleteUserController'
        });
        deleteInstance.result.then( () => {
            profileService.deleteAccount();
            $scope.logOut($scope.user._id);
            $location.path('/');
        });
    };
// change avatar Popup window
    $scope.changeAvatar =  () => {
        changeImgWindow();
    };

    function changeImgWindow() {

        const changeInstance = $uibModal.open({
            animation: true,
            templateUrl: 'profile/avatarContent.html',
            controller: 'avatarController'
        });
        changeInstance.result.then( (img) => {
            avatarMsg();
            $scope.avatar = img;
            $scope.user.userImg = $scope.avatar;
            $scope.selectedImg = img.image;
        })

    }
};
