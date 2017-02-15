(function () {
	angular.module('app').controller('JobsListingController', JobsListingController);

	JobsListingController.$inject = ['requestFactory'];

	function JobsListingController(requestFactory)
	{
		var vm = this;
		vm.search = '';
		vm.jobs = [];
		
		activate();

		function activate()
		{
			getJobs();
		}

		function getJobs()
		{
			return requestFactory.request({
				method: 'get',	
				url: 'api/Jobs.php'
			})
			.then(function (response) {
				vm.jobs = response;
			});
		}

	}
})();