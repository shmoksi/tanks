import {ManageProfileController} from './ManageProfileController';
import {UploadController} from './UploadController';
import {DeleteUserController} from './DeleteUserController';
import {AvatarController} from './AvatarController';
import {ProfileService} from './ProfileService';
import angular from 'angular';
import ngRoute from 'angular-route';

module.exports = angular.module('tanks.profile', [
    ngRoute
])
    .controller('ManageProfileController', ManageProfileController)
    .controller('UploadController', UploadController)
    .controller('DeleteUserController', DeleteUserController)
    .controller('AvatarController', AvatarController)
    .service('ProfileService', ProfileService)
    .config(function ($routeProvider) {
        $routeProvider
            .when('/profile', {
                templateUrl: 'profile/manageProfile.html',
                controller: ManageProfileController
            });
    });
