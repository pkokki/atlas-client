(function() {
	'use strict';

	
	angular.module('atlasSpaceApp')
		/**
		 * @ngdoc function
		 * @name atlasSpaceApp.value:config
		 * @description
		 * # config
		 * config of the atlasSpaceApp
		 */
		.value('config', getConfig())
		/**
		 * @ngdoc function
		 * @name atlasSpaceApp.value:space
		 * @description
		 * # space
		 * space of the atlasSpaceApp
		 */
		.factory('space', space)
		/**
		 * @ngdoc function
		 * @name atlasSpaceApp.factory:logger
		 * @description
		 * # logger
		 * logger of the atlasSpaceApp
		 */
		 .factory('logger', logger)
		/**
		 * @ngdoc function
		 * @name atlasSpaceApp.controller:ShellCtrl
		 * @description
		 * # ShellCtrl
		 * Controller of the atlasSpaceApp
		 */
		.controller('ShellCtrl', ShellCtrl)
		/**
		 * @ngdoc function
		 * @name atlasSpaceApp.controller:SidebarCtrl
		 * @description
		 * # SidebarCtrl
		 * Controller of the atlasSpaceApp
		 */
		.controller('SidebarCtrl', SidebarCtrl)
		/**
		 * @ngdoc function
		 * @name atlasSpaceApp.controller:MainCtrl
		 * @description
		 * # MainCtrl
		 * Controller of the atlasSpaceApp
		 */
		.controller('MainCtrl', MainCtrl)
		;
	 
	function logger($log/*, toastr*/) {
        var service = {
            //showToasts: true,

            error   : error,
            info    : info,
            success : success,
            warning : warning,

            // straight to console; bypass toastr
            log     : $log.log
        };

        return service;
        /////////////////////

        function error(message, data, title) {
            //toastr.error(message, title);
            $log.error('Error: ' + message, data);
        }

        function info(message, data, title) {
            //toastr.info(message, title);
            $log.info('Info: ' + message, data);
        }

        function success(message, data, title) {
            //toastr.success(message, title);
            $log.info('Success: ' + message, data);
        }

        function warning(message, data, title) {
            //toastr.warning(message, title);
            $log.warn('Warning: ' + message, data);
        }
    }
	
	function space() {
		var service = {
			getNavRoutes: getNavRoutes
		};
		return service;
        /////////////////////
		
		function getNavRoutes() {
			return [
				{ url: '/', title: 'Home', icon: 'mdi mdi-home'},
				{ url: '/about', title: 'Space configurator', icon: 'mdi mdi-settings'},
				{ url: '', title: '', icon: ''},
			];
		}
		
	}
	
	function getConfig() {
        return {
			app: {
				title: 'atlas space',
				version: '0.1.0',
				errorPrefix: '[Atlas Error] ', //Configure the exceptionHandler decorator
			},
			splash: {
				message: 'The system is loading...', 
			},
			busy: {
				message: 'Please wait...',
			},
			views: {
				topnavView: 'views/layout.topnav.html',
				sidebarView: 'views/layout.sidebar.html',
			},
		};
    }
	
	function MainCtrl($scope) {
		$scope.awesomeThings = [
		  'HTML5 Boilerplate',
		  'AngularJS',
		  'Karma'
		];
	}
	
	function SidebarCtrl(space) {
		var vm = this;
        vm.isCurrent = isCurrent;
		
		activate();

        function activate() { 
			vm.navRoutes = space.getNavRoutes(); 
		}
		
		function isCurrent(route) {
        /*    if (!route || !route.title || !$route.current || !$route.current.title) {
                return '';
            }
            var menuName = route.title;
            return $route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
		*/
			return '';
        }
	}
	
	function ShellCtrl($timeout, config, logger) {
		var vm = this;

		vm.title = config.app.title;
		vm.version = config.app.version;

        vm.isBusy = config.busy != null;
        vm.busyMessage = config.busy.message;

		vm.showSplash = config.splash != null;
		vm.splashMessage = config.splash.message; // 'The system is loading...';

		vm.toggleSidebar = toggleSidebar;
		vm.closeSidebar = closeSidebar;
		vm.topnavView = config.views.topnavView;
		vm.sidebarView = config.views.sidebarView;
		
		activate();

        function activate() {
			closeSidebar();
			hideSplash();
			logger.success(config.app.title + ' loaded!', null);
        }

		function hideSplash() {
			if (vm.showSplash) {
				//Force a 1 second delay so we can see the splash.
				$timeout(function() {
					vm.showSplash = false;
				}, 1000);
			}
        }

		function toggleSidebar() {
			vm.sidebarIsOpened = !vm.sidebarIsOpened;
		}

		function closeSidebar() {
			vm.sidebarIsOpened = false;
		}
	}
})();