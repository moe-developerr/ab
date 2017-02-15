(function () {
	angular.module('app').factory('authInterceptor', authInterceptor);

	authInterceptor.$inject = ['$rootScope', '$q', 'localStorage', '$location'];

	function authInterceptor($rootScope, $q, localStorage, $location)
	{
		return {
			request: request,
			response: response
		};

		function request(config)
		{
			config.headers = config.headers || {};

			if(localStorage.get('token')) {
				config.headers.Authorization = localStorage.get('token');
				console.log('token exist');
			} else {
				console.log('no token');
			}

			return config;
		}

		function response(response)
		{
			if(response.status === 401) {
				// user is not authenticated
				// $location.path('/login');
			}

			return response || $q.when(response);
		}
	}

})();