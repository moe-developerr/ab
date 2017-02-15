(function () {
	angular.module('app').factory('requestFactory', requestFactory);

	requestFactory.$inject = ['$http'];

	function requestFactory($http)
	{
		return {
			request: request
		};

		function request(request)
		{
			return $http(request)
				.then(success)
				.catch(fail);

			function success(response)
			{
				return response.data;
			}

			function fail(error)
			{
				return error.statusText;
			}
		}
		
	}

})();