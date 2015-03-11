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
      .when('/:area/:section', {
		templateUrl: function(parameters){
			return 'views/' + parameters.area + '/' + parameters.section + '.html';
		},
        //templateUrl: 'views/about.html',
        controller: function($routeParams, logger){
			logger.info($routeParams.area + 'Ctrl');
			return $routeParams.area + 'Ctrl';
		}
      })
      .otherwise({
        redirectTo: '/'
      });
  });
