(function () {
	angular.module('app').controller('UpdatePasswordController', UpdatePasswordController);

	UpdatePasswordController.$inject = ['requestFactory'];

	function UpdatePasswordController(requestFactory)
	{
		var vm = this;
		vm.submitting = false;
		vm.response = '';
		vm.updatePassword = updatePassword;

		function updatePassword()
		{
			vm.submitting = true;

			requestFactory.request({
				method: 'post',
				url: 'api/ChangePassword.php',
				data: vm.model
			})
			.then(function (response) {
				vm.submitting = false;
				vm.model = {};
				document.getElementById('reset').click();
				vm.response = response.success;
			});
		}
	}
})();