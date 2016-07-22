export class UploadController {
    constructor($http, Upload, $scope, $uibModalInstance) {
     $scope.submit = () => {
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
                $uibModalInstance.close(resp.data);
            });
        };
        $scope.cancel = () => {
            $uibModalInstance.dismiss('cancel');
        };

    }
}