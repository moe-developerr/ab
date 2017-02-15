(function () {
	angular.module('app').controller('JobController', JobController);

	JobController.$inject = ['requestFactory', '$routeParams'];

	function JobController(requestFactory, $routeParams)
	{
		var vm = this;
		vm.job = {};
		vm.applyResponse = '';
		vm.shareResponse = '';
		vm.shareModel = {};
		vm.applyModel = {};
		vm.share = share;
		vm.apply = apply;

		activate();

		function activate()
		{
			getDetails();
		}

		function getDetails()
		{
			return requestFactory.request({
				method: 'get',
				url: 'api/GetJob.php',
				params: {
					id: $routeParams.id
				}
			})
			.then(function (response) {
				vm.job = response;
			});
		}

		function apply()
		{
			return requestFactory.request({
				method: 'get',
				url: 'api/ApplyJob.php',
				params: {
					jobVacId: $routeParams.id
				}
			})
			.then(function (response) {
				vm.shareResponse = '';
				vm.applyResponse = response;
			});
		}

		function share()
		{
			return requestFactory.request({
				method: 'get',
				url: 'api/ShareJob.php',
				params: {
					jobVacId: $routeParams.id,
					from: 'Moe',
					to: vm.shareModel.email,
					message: vm.shareModel.message
				}
			})
			.then(function (response) {
				vm.applyResponse = '';
				vm.shareResponse = response;
			});
		}
	}
})();