
'use strict';

/* The seagull angular application */
var seagull = angular.module('seagull', [
  'ngRoute',
  'seagullControllers',
  'pascalprecht.translate'
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
      when('/containers', {
        templateUrl: '/static/html/containers.html',
        controller: 'ContainersController'
      }).
      when('/containers/:id', {
        templateUrl: '/static/html/container.html',
        controller: 'ContainerController'
      }).
      when('/images', {
        templateUrl: '/static/html/images.html',
        controller: 'ImagesController'
      }).
      when('/images/:id', {
        templateUrl: '/static/html/image.html',
        controller: 'ImageController'
      }).
      when('/images/:user/:repo', {
        templateUrl: '/static/html/image.html',
        controller: 'ImageController'
      }).
      when('/configuration', {
        templateUrl: '/static/html/configuration.html',
        controller: 'ConfigurationController'
      });
      /* No default page for angular
      otherwise({
        redirectTo: '/'
      }); */
  }]
);

seagull.config(function ($translateProvider) {
  $translateProvider.translations('en-us', {
    // Index html
    seagull: 'Seagull',
    containers: 'Containers',
    images: 'Images',
    configuration: 'Configuration',
    more: 'More',
    zh_cn: '简体中文',
    zh_hant: '繁體中文',
    en_us: 'English',
    need_help: 'Need Help',
    // Home page
    the_best_friend_of_docker: 'the best friend of docker',
  });

  $translateProvider.translations('zh-cn', {
    seagull: '海鸥',
    containers: '容器',
    images: '镜像',
    configuration: '配置',
    more: '更多',
    zh_cn: '简体中文',
    zh_hant: '繁體中文',
    en_us: 'English',
    need_help: '帮助',
    // Home page
    the_best_friend_of_docker: 'docker最好的伙伴',
  });

  $translateProvider.translations('zh-hant', {

  });

  $translateProvider.preferredLanguage('en-us');
});

seagull.controller('IndexController', function ($scope, $translate) {
  $scope.changeLanguage = function (key) {
    $translate.use(key);
  };
});

/* File size filter, code from https://gist.github.com/yrezgui/5653591 */
seagull.filter( 'filesize', function () {
  var units = [
    'bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB'
  ];

  return function( bytes, precision ) {
    if ( isNaN( parseFloat( bytes )) || ! isFinite( bytes ) ) {
      return '?';
    }

    var unit = 0;
    while ( bytes >= 1024 ) {
      bytes /= 1024;
      unit ++;
    }
    return bytes.toFixed( + precision ) + ' ' + units[ unit ];
  };
});

/* Filter to convert string array into string */
seagull.filter( 'array_to_string', function () {
  return function( strings ) {
    if ( !Array.isArray(strings) ) {
      return '';
    }

    var result = "";
    for (var i=0; i<strings.length; i++) {
      result += strings[i];
      if (i != strings.length-1) {
        result += ", ";
      }
    }
    return result;
  };
});

/* Filter to convert boolean into string */
seagull.filter( 'boolean_to_string', function () {
  return function( bool ) {
    /* Todo: seems not work
    if ( typeof bool != "boolean" ) {
      return '';
    } */

    if (bool) {
      return "true";
    } else {
      return "false";
    }
  };
});
