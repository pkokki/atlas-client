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
    'ui.router',
    'ngSanitize',
    'ngTouch',
	'ngMaterial',
	'ngplus'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	
	
    $stateProvider
      .state('space', {
		url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('area', {
		url: '/:area/:section',
		templateUrl: function(parameters){
			if (!parameters.section) {
				parameters.section = 'home';
			}
			return 'views/' + parameters.area + '/' + parameters.section + '.html';
		},
        controller: 'SpaceAreaCtrl as vm'
      })
	  ;
  });
