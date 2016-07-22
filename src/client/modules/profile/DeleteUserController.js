export class DeleteUserController {
    constructor($scope, $uibModalInstance) {

        $scope.ok = () => {
            $uibModalInstance.close();
        };
        $scope.cancel = () => {
            $uibModalInstance.dismiss('cancel');
        };
    }
}