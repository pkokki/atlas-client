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
	'lumx',
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
			var section = parameters.section;
			if (!section) {
				section = 'home';
			}
			return 'views/' + parameters.area + '/' + section + '.html';
		},
        controller: 'SpaceAreaCtrl as vm'
      })
	  ;
  });
