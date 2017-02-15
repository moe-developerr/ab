(function () {
	angular.module('app').controller('RegisterController', RegisterController);

	RegisterController.$inject = ['requestFactory'];

	function RegisterController(requestFactory)
	{
		var vm = this;
		vm.model = {};
		vm.submitting = false;
		vm.response = "";
		vm.registerUser = registerUser;

		function registerUser()
		{
			vm.submitting = true;
			requestFactory.request({
				method: 'post',
				url: 'api/UserAccounts.php',
				data: vm.model
			})
			.then(function (response) {
				vm.submitting = false;
				vm.response = response;
				vm.model = {};
				document.getElementById('reset').click();
			});
		}

	}
})();