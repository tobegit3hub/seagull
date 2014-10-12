
'use strict';

/* The angular application controllers */
var seagullControllers = angular.module('seagullControllers', []);

/* This controller to get comment from beego api */
seagullControllers.controller('HomeController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {


}]);

seagullControllers.controller('ContainersController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {


}]);

seagullControllers.controller('ContainerController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {


}]);

seagullControllers.controller('ImagesController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {


    /* Get the comment objects */
    $http.get('http://127.0.0.1:4243/images/json').success(function(data) {
      /* If the data is empty string, don't return objects */
      if(typeof data[0].Id == "undefined") {
        $scope.comments = null;
      } else {
        $scope.images = data;
      }
    });


}]);

seagullControllers.controller('ImageController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {


}]);


seagullControllers.controller('ConfigurationController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {


}]);
