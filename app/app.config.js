(function () {
	angular.module('app').config(['$routeProvider', '$locationProvider', '$httpProvider', config]);

	function config($routeProvider, $locationProvider, $httpProvider)
	{
		$httpProvider.interceptors.push('authInterceptor');

		$locationProvider.html5Mode(true);
		
		$routeProvider
			.when('/register', {
				templateUrl: 'app/auth/register.html',
				controller: 'RegisterController',
				controllerAs: 'vm'
			})
			.when('/login', {
				templateUrl: 'app/auth/login.html',
				controller: 'LoginController',
				controllerAs: 'vm'
			})
			.when('/forgot-password', {
				templateUrl: 'app/auth/password/forgot-password.html',
				controller: 'ForgotPasswordController',
				controllerAs: 'vm'
			})
			.when('/update-password', {
				templateUrl: 'app/auth/password/update-password.html',
				controller: 'UpdatePasswordController',
				controllerAs: 'vm'
			})
			.when('/profile', {
				templateUrl: 'app/profile/profile.html',
				controller: 'ProfileController',
				controllerAs: 'vm',
				isRestricted: true
			})
			.when('/jobs', {
				templateUrl: 'app/jobs/jobs-listing.html',
				controller: 'JobsListingController',
				controllerAs: 'vm'
			})
			.when('/job/:id', {
				templateUrl: 'app/jobs/job.html',
				controller: 'JobController',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: 'login'
			});
	}
})();