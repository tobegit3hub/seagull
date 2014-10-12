
'use strict';

/* The seagull angular application */
var seagull = angular.module('seagull', [
  'ngRoute',
  'seagullControllers'
]);

/* Configurate application like router and others*/
seagull.config(['$locationProvider', '$routeProvider',
  function($locationProvider, $routeProvider) {
    /* Remove the # in url from Angular */
    $locationProvider.html5Mode(true);

    /* Set router, all in /js/controllers.js */
    $routeProvider.
      when('/', {
        templateUrl: '/static/html/home.html',
        controller: 'HomeController'
      }).
      when('/container', {
        templateUrl: '/static/html/container.html',
        controller: 'ContainerController'
      }).
      when('/image', {
        templateUrl: '/static/html/image.html',
        controller: 'ImageController'
      }).
      when('/configuration', {
        templateUrl: '/static/html/configuration.html',
        controller: 'ConfigurationController'
      }).
      otherwise({
        /* Default to home page */
        redirectTo: '/'
      });
  }]);
