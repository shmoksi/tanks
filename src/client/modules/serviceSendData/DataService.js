export class DataService {
    constructor($http) {
        console.log('Hello inside');

        this.getData = () => {
            console.log('Hello level 2');
            $http.get('./gameData.json').then((responce) => {
            console.log('Hello level 3');
                console.log(responce.data, 'responce.data');
            });

            return 'Hello level 4';
        };

        this.updateData = (gameData) => {
            $http.put('./gameData.json', gameData).then((responce) => {
                console.log(responce.data, 'responce.data');
            });
        };
    }
}
