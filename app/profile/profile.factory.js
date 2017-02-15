(function () {
	angular.module('app').controller('ProfileController', ProfileController);

	ProfileController.$inject = ['requestFactory', 'Upload'];

	function ProfileController(requestFactory, Upload)
	{
		// essential stuff
		var vm = this;
		vm.model = {};
		vm.response = '';
		vm.save = save;

		// personal info
		vm.listOfCountries = [];
		vm.personalAddresses = [];
		vm.addAddress = addAddress;

		// education
		vm.listOfDegrees = [];
		vm.degrees = [];
		vm.addDegree = addDegree;

		// Upload CV
		vm.cv = {};
		vm.cvResponse = '';
		vm.uploadCV = uploadCV;

		activate();

		function activate()
		{
			attachEvents();
			// personal info
			getCountries();
			addAddress();
			// education
			getDegrees();
			addDegree();
		}

		function uploadCV()
		{
			Upload.upload({
				url: 'api/UploadCV.php',
				data: vm.cv
			})
			.then(function (response) {
				vm.cvResponse = response.data;
			}
			,function (error) {
				vm.cvResponse = error.statusText;
			}
			,function (event) {
				// console.log(event);
			});
		}

		function getDegrees()
		{
			return requestFactory.request({
				method: 'get',
				url: 'api/GetDegrees.php'
			})
			.then(function (response) {
				vm.listOfDegrees = response;
			});
		}

		function addDegree()
		{
			vm.degrees.push({
				degree: '',
				major: ''
			});
		}

		function getCountries()
		{
			return requestFactory.request({
				method: 'get',
				url: 'api/GetCountries.php'
			})
			.then(function (response) {
				vm.listOfCountries = response;
			});
		}

		function addAddress()
		{
			vm.personalAddresses.push({
				country: '',
				city: ''
			});
		}

		function attachEvents()
		{
			var tabsWrapper = document.querySelector('.nav-tabs');
			if(tabsWrapper.addEventListener) {
				tabsWrapper.addEventListener('click', switchTabs);
			} else if(tabsWrapper.attachEvent) {
				tabsWrapper.attachEvent('onclick', switchTabs);
			}
		}
		
		function save()
		{
			return requestFactory.request({
				method: 'post',
				url: 'api/SaveProfile.php',
				data: vm.model
			})
			.then(function (response) {
				vm.response = response;
			});
		}

		function switchTabs(e)
		{
			e.preventDefault();
			var activeTab = this.querySelectorAll('.active')[0];
			var activePane = document.querySelector('.tab-pane.active');
			activeTab.className = activeTab.className.replace(/\bactive\b/, "");
			e.target.parentNode.className += ' active';
			activePane.className = activePane.className.replace(/\bactive\b/, '');
			document.querySelector(e.target.getAttribute('href')).className += ' active';
		}
	}
})();