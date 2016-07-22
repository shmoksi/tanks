export class ProfileService {
    constructor($http) {
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
    }
}