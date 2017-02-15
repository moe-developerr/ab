(function () {
	angular.module('app').controller('NavController', NavController);

	NavController.$inject = ['$location'];

	function NavController($location)
	{
		var vm = this;
		vm.isActive = isActive;

		function isActive(path)
		{
			return path === $location.path().substring(1);
		}
	}
})();