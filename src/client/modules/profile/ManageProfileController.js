import {AvatarController} from './AvatarController';
import {DeleteUserController} from './DeleteUserController';
import {ProfileService} from './ProfileService';
export class ManageProfileController {
    constructor($scope, $uibModal, ProfileService, toastr, $location) {
        $scope.emailStatus = true;
        $scope.nameMinLength = 5;
        $scope.nameMaxLength = 15;
        $scope.passMinLength = 6;
        $scope.passMaxLength = 12;

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

        $scope.getSalt = () => {
            return "?salt=" + new Date().getTime();
        };

        $scope.selectedImg = "api/users/profile/getImage/userAvatar" + ($scope.getSalt)();

        function savingMsg() {
            toastr.success('Your changes are saved!', 'Message', {
                closeButton: true,
                closeHtml: '<button>&times;</button>'
            });
        }

        function avatarMsg() {
            toastr.warning('Do not forget to save changes!!', 'Message', {
                closeButton: true,
                closeHtml: '<button>&times;</button>'
            });
        }

        $scope.init = (() => {
            ProfileService.getProfile().then((resp) => {
                $scope.user = resp.data;
            });
        })();

        $scope.saveChanges = (user) => {
            let userInfo = {
                userName: user.userName,
                userAge: user.userAge,
                userEmail: user.userEmail,
                userImg: user.userImg
            };

            if (user.oldPassword) {
                userInfo.userOldPassword = user.oldPassword;
                userInfo.userNewPassword = user.newPassword;
                userInfo.userConfPassword = user.newPassword;
            }

            ProfileService.update(userInfo);
            savingMsg();
        };

// Delete popup window;
        $scope.deleteUser = () => {

            const deleteInstance = $uibModal.open({
                animation: true,
                templateUrl: 'profile/DeleteContent.html',
                controller: DeleteUserController
            });
            deleteInstance.result.then(() => {
                ProfileService.deleteAccount();
                $scope.logOutClick($scope.user._id);
                $location.path('/');
            });
        };
// change avatar Popup window
        $scope.changeAvatar = () => {
            changeImgWindow();
        };

        function changeImgWindow() {

            const changeInstance = $uibModal.open({
                animation: true,
                templateUrl: 'profile/avatarContent.html',
                controller: AvatarController
            });
            changeInstance.result.then((img) => {
                avatarMsg();
                $scope.avatar = img;
                $scope.user.userImg = $scope.avatar;
                $scope.selectedImg = img.image;
            })
        }
    }
}