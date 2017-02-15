(function () {
	angular.module('app').controller('LoginController', LoginController);

	LoginController.$inject = ['authFactory', '$location'];

	function LoginController(authFactory, $location)
	{
		var vm = this;
		vm.model = {};
		vm.submitting = false;
		vm.loginUser = loginUser;
		vm.response = '';

		function loginUser()
		{
			vm.submitting = true;
			authFactory.authenticate(vm.model)
				.then(function (response) {
					vm.submitting = false;
					vm.model = {};
					document.getElementById('reset').click();
					if(response === true) $location.path('/jobs');
					else vm.response = response;
				});
		}
	}
})();