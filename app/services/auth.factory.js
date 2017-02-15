(function () {
	angular.module('app').factory('authFactory', authFactory);

	authFactory.$inject = ['$http', 'localStorage'];

	function authFactory($http, localStorage)
	{
		return {
			authenticate: authenticate
		};

		function authenticate(data)
		{
			return $http.post('api/Authorize.php', data)
				.then(success)
				.catch(fail);

			function success(response)
			{
				localStorage.set('token', response.data);
				localStorage.set('name', 'Moe');
				localStorage.set('isLoggedIn', true);
				return true;
			}

			function fail(error)
			{
				localStorage.remove('token');
				localStorage.remove('name');
				localStorage.remove('isLoggedIn');
				return error.statusText;
			}
		}
	}
	
})();