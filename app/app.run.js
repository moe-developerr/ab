(function () {
	angular.module('app').run([
		'defaultErrorMessageResolver',
		'$rootScope',
		'localStorage',
		'$location',
		defaultErrorMessageResolver
	]);

	function defaultErrorMessageResolver(defaultErrorMessageResolver, $rootScope, localStorage, $location)
	{
		$rootScope.$on('$routeChangeStart', restrictAccess);

		function restrictAccess(event, next)
		{
			if(next.isRestricted && !localStorage.get('isLoggedIn')) {
				event.preventDefault();
				$location.path('/login');
			}
		}

    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
      errorMessages['myCustomError'] = 'My custom error message';
      errorMessages['anotherErrorMessage'] = 'An error message with the attribute value {0}';
    });
	}
})();