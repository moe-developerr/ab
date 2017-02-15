(function () {
	angular.module('app').factory('localStorage', localStorage);

	localStorage.$inject = ['$window'];

	function localStorage($window)
	{
		return {
			set: set,
			get: get,
			remove: remove
		}

		function set(key, value)
		{
			$window.localStorage.setItem(key, value);
		}

		function get(key)
		{
			return $window.localStorage.getItem(key) || false;
		}

		function remove(key)
		{
			$window.localStorage.removeItem(key);
		}

		function setObject(key, value)
		{
			$window.localStorage.setItem(key, JSON.stringify(value));
		}

		function getObject(key)
		{
			if(typeof $window.localStorage.getItem(key) == 'undefined') return false;
			return JSON.parse($window.localStorage.getItem(key));
		}
	}
})();