import {UploadController} from './UploadController'
export class AvatarController {
    constructor($http, $scope, $uibModalInstance, $uibModal, ProfileService) {
        $scope.images = [];
        $scope.customImages = [];
        ProfileService.getPublicImages().then((res) => {
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
                controller: UploadController
            });
            uploadInstance.result.then((img) => {
                $scope.customImages = [];
                $scope.customImages.push(img);
                $scope.setCurrentImage(img);

            })

        };

    }
}

