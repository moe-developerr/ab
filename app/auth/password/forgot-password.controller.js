(function () {
	angular.module('app').controller('ForgotPasswordController', ForgotPasswordController);

	ForgotPasswordController.$inject = ['requestFactory'];

	function ForgotPasswordController(requestFactory)
	{
		var vm = this;
		vm.model = {};
		vm.response = '';
		vm.submitting = false;
		vm.sendEmail = sendEmail;

		function sendEmail()
		{
			vm.submitting = true;

			requestFactory.request({
				method: 'post',
				url: 'api/ForgotPassword.php',
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