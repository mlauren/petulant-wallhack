// script.js

// @todo all this new stuff I need to write!
// directive for sticky nav
// directive for active links
// directive for 

// create the module and name it poopoo
var poopoo = angular.module('poopoo', ['google-maps']);

poopoo.directive('modalDialog', function() {
	return {
		restrict: 'E',
		scope: {
			show: '='
		},
		replace: true, // replace this with a template we provide
		transclude: true, // we want to insert custom content into the directive
		link: function( scope, element, attrs ) {
			scope.dialogStyle = {};
			if (attrs.width)
				scope.dialogStyle.width = attrs.width;
			scope.hideModal = function() {
				scope.show = false;
			};
		},
		template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
	}
});

poopoo.directive('fixedHeader', function() {
	return {
		// Restrict it to be an attribute in this case
		restrict: 'A',
		link: function(scope, element, attrs) {
			window.scrollmything = function() {
				var window = this;
				window.elementHeight = element.height();
				window.activate();
				$(window).on('scroll', this.activate);
				$(window).on('resize', this.activate);
			};
			window.activate = function() {
				var scrollTop = $(window).scrollTop();
				if( scrollTop > window.elementHeight ) {
					window.scrollEnabled();
				} else {
					window.scrollDisabled();
				}
			};
			window.scrollEnabled = function() {
				$(element).addClass('fixed');
			
			};
			window.scrollDisabled = function() {
				$(element).removeClass('fixed');
			};
			window.scrollmything();
		}
	};
});

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
				template: '<div> <div class="inner-slide"> <a class="th" href="{{link}}" target="blank"><img src="{{image}}" /> </a> <a href="{{link}}" target="blank"><span> {{caption}} </span></a> </div></div>',
				target: $(element).attr('id'),
				limit: attrs.instagramFeed.limit,
				// We need to make sure the images are loaded before adding a slideshow
				after: function() {
					// activate slick
					$(element).slick({
						infinite: true,
						slidesToShow: 3,
						autoplaySpeed: 3000,
						responsive: [
							{
								breakpoint: 600,
								settings: {
									slidesToShow: 2,
									slidesToScroll: 2
								}
							},
							{
								breakpoint: 480,
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1
								}
							}
						]
					});
				}
			});
			scope.feed.run();
		}
	};
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

poopoo.controller('modalController', function($scope) {
  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };
});

poopoo.controller('mainController', function($scope)
{
	// create a message to display inside the view
	$scope.message = 'I look geeewwd';

	$scope.map = {
		center: {
			latitude: 32.8632069,
			longitude: -96.802786
		},
		zoom: 15,
		draggable: true,
	};

	$scope.mklabel = {
		content: "Mel Crews"
	};
});
