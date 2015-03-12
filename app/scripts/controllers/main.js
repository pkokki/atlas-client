(function() {
	'use strict';
 
	function logger($log/*, toastr*/) {
		/**
		 * @ngdoc service
		 * @name logger.error
		 * @description
		 * # error
		 * error(message, data, title).
		 */
        function error(message, data/*, title*/) {
            //toastr.error(message, title);
            $log.error('Error: ' + message, data);
        }

		/**
		 * @ngdoc service
		 * @name logger.info
		 * @description
		 * # info
		 * info(message, data, title).
		 */
        function info(message, data/*, title*/) {
            //toastr.info(message, title);
            $log.info('Info: ' + message, data);
        }

        function success(message, data/*, title*/) {
            //toastr.success(message, title);
            $log.info('Success: ' + message, data);
        }

        function warning(message, data/*, title*/) {
            //toastr.warning(message, title);
            $log.warn('Warning: ' + message, data);
        }
		
		/////////////////////
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
    }
	
	function space() {
		function getNavRoutes() {
			return [
				{ url: '/', title: 'Home', icon: 'mdi mdi-home'},
				{ url: '/config/home', title: 'Space configurator', icon: 'mdi mdi-settings'},
				{ url: '', title: '', icon: ''},
			];
		}
		
		/////////////////////
		var service = {
			title: 'atlas space',
			version: '0.1.0',
			splash: {
				message: 'The system is loading...', 
			},
			getNavRoutes: getNavRoutes
		};
		return service;
	}
	
	function getConfig() {
        return {
			app: {
				errorPrefix: '[Atlas Error] ', //Configure the exceptionHandler decorator
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
		function activate() { 
			vm.navRoutes = space.getNavRoutes(); 
		}
		
		function isCurrent(/*route*/) {
        /*    if (!route || !route.title || !$route.current || !$route.current.title) {
                return '';
            }
            var menuName = route.title;
            return $route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
		*/
			return '';
        }
		
		var vm = this;
        vm.isCurrent = isCurrent;
		activate();
	}
	
	function ShellCtrl($timeout, config, logger, space) {
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
		
		var vm = this;

		vm.title = space.title;
		vm.version = space.version;

        vm.isBusy = config.busy !== null;
        vm.busyMessage = config.busy.message;

		vm.showSplash = space.splash !== null;
		vm.splashMessage = space.splash.message; // 'The system is loading...';

		vm.toggleSidebar = toggleSidebar;
		vm.closeSidebar = closeSidebar;
		vm.topnavView = config.views.topnavView;
		vm.sidebarView = config.views.sidebarView;
		
		activate();
	}
	
	function SpaceAreaCtrl($state) {
		var vm = this;
		vm.name = $state.params.area;
		vm.section = $state.params.section;
	}
	
	angular.module('atlasSpaceApp')
		/**
		 * @ngdoc service
		 * @name atlasSpaceApp:config
		 * @kind function
		 * @description
		 * # config
		 * config of the atlasSpaceApp
		 */
		.value('config', getConfig())
		/**
		 * @ngdoc service
		 * @name atlasSpaceApp:space
		 * @kind function
		 * @description
		 * # space
		 * space of the atlasSpaceApp
		 */
		.factory('space', space)
		/**
		 * @ngdoc service
		 * @name atlasSpaceApp:logger
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
		/**
		 * @ngdoc function
		 * @name atlasSpaceApp.controller:SpaceAreaCtrl
		 * @description
		 * # SpaceAreaCtrl
		 * Controller of the atlasSpaceApp
		 */
		.controller('SpaceAreaCtrl', SpaceAreaCtrl)
		;
})();