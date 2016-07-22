import {DataService} from './DataService';
import angular from 'angular';
import ngRoute from 'angular-route';

module.exports = angular.module('tanks.service', [
    ngRoute
])
    .service('DataService', DataService);
