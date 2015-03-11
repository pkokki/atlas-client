'use strict';

/**
 * @ngdoc overview
 * @name atlasSpaceApp
 * @description
 * # atlasSpaceApp
 *
 * Main module of the application.
 */
angular
  .module('atlasSpaceApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'lumx',
	'ngplus'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
