
// script.js

	// create the module and name it poopoo
	var poopoo = angular.module('poopoo', []);


	poopoo.directive('instagramFeed', function() {
		return {
			// Restrict it to be an attribute in this case
			restrict: 'A',
			link: function(scope, element, attrs) {
				scope.feed = new Instafeed({
					// every time we load more, run this function
					get: 'user',
					userId: 289630746,
					accessToken: '289630746.467ede5.3fa70b5dd0a34905b578e7cad757f4bf',
					clientId: '8f7c904f3eb8494e91e5cdb727c11a66',
					resolution: 'standard_resolution',
					template: '<div> <div class="inner-slide"> <img src="{{image}}" /><span> {{caption}} </span> </div></div>',
					target: $(element).attr('id'),
					limit: attrs.instagramFeed.limit,
					// We need to make sure the images are loaded before adding a slideshow
					after: function() {
						// activate slick
						$(element).slick({
							infinite: true,
							slidesToShow: 4,
							slidesToScroll: 3,
							centerMode: true,
							centerPadding: '60px',
							autoplay: true,
							autoplaySpeed: 1500
						});
					}
				});
				scope.feed.run();
			}
		}
	});

	poopoo.config(function($routeProvider)
	{
		$routeProvider
			.when('/', {
				templateUrl : 'pages/home.html',
				controller	: 'mainController'
			})
			.when('/about', {
				templateUrl	: 'pages/about.html',
				controller 	: 'aboutController'
			})
			.when('/contact', {
				templateUrl	: 'pages/contact.html',
				controller 	: 'contactController'
			})
			.otherwise({
				redirectTo: '/login'
			});

	});

	poopoo.controller('mainController', function($scope)
	{
		// create a message to display inside the view
		$scope.message = 'I look geeewwd';
	});

	poopoo.controller('aboutController', function($scope)
	{
		$scope.message = 'About page using angular over here';
	});

	poopoo.controller('contactController', function($scope) {
		$scope.message = 'this is a demo so pretty much nooope';
	});
