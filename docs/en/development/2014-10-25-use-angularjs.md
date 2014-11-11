
# Use AngularJS

## Official Tutorial

If you're new to AngularJS, you have to read the official tutorial, <https://docs.angularjs.org/tutorial>. After reading this, I know almost I have to know about building a single page application.

You can also go to w3school to learn more about AngularJS in <http://www.w3schools.com/angular/default.asp>.

## How To Use It

It's quite easy to use AngularJS in your project. I'm using Bower and just run `bower install angular --save` and `bower install angular-router --save` to download its libraries. You can also download the js files in the official website.

Then we include it in our HTML files, write the controllers and use the directive in HTML files. For more basic tutorial of AngularJS, please refer to the official tutorials above.

## How Seagull Use It

### Include The Library

We have included AngularJS in our seagull/views/index.html.

```
 <script src="static/bower_components/angular/angular.min.js"></script>
 <script src="static/bower_components/angular-route/angular-route.min.js"></script>
 <script src="static/js/app.js"></script>
 <script src="static/js/controllers.js"></script>
```

### Modules And Router

We defined the AngualrJS application modules and routers in seagull/static/js/app.js.

```
/* The seagull angular application */
var seagull = angular.module('seagull', [
  'ngRoute',
  'seagullControllers',
  'ngCookies', // To save perference of i18n language
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
      }).
      when('/dockerhub', {
        templateUrl: '/static/html/dockerhub.html',
        controller: 'DockerhubController'
      });
      /* No default page for angular so that beego can process API request
      otherwise({
        redirectTo: '/'
      }); */
  }]
);
```

### Controllers

Then all the controllers are implemented in seagull/static/js/controllers.js.

```
/* All angular application controllers */
var seagullControllers = angular.module('seagullControllers', []);

/* This controller to get comment from beego api */
seagullControllers.controller('HomeController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {

  /* Get the version object */
  $http.get('/dockerapi/version').success(function(data) {
    $scope.version = data;
    $scope.Os = $scope.version.Os;
    $scope.KernelVersion = $scope.version.KernelVersion;
    $scope.GoVersion = $scope.version.GoVersion;
    $scope.Version = $scope.version.Version;
  });

  /* Get the info object */
  $http.get('/dockerapi/info').success(function(data) {
    $scope.info = data;
    $scope.Containers = $scope.info.Containers;
    $scope.Images = $scope.info.Images;
  });
}]);
```

### HTML View

Then we can use AngularJS directives in seagull/static/html/image.html.

```
 <!-- The image page, refer to static/js/controller -->
 <div ng-controller="ImageController">

  <span class="page-header">
    <!-- Display image title and the JSON link -->
    <h1 class="page-header-left">{{'image'|translate}} <a ng-href="/dockerapi/images/{{image.Id}}/json" target="_blank"><img src="static/img/json-logo.png" height="32"></a></h1>
  </span> <!-- End of page header -->

  <!-- Alert if we get nothing from server -->
  <div ng-show="!image" class="alert alert-danger" role="alert">{{'no_such_image'|translate}}</div>

  <!-- Display image information -->
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>{{'attribute'|translate}}</th>
        <th>{{'value'|translate}}</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>{{'id'|translate}}</td>
        <td>{{image.Id | limitTo:12}}</td> <!-- Shorten image id -->
      </tr>

      <tr>
        <td>{{'author'|translate}}</td>
        <td>{{image.Author}}</td>
      </tr>

      <tr>
        <td>{{'architecture'|translate}}</td>
        <td>{{image.Architecture}}</td>
      </tr>

      <tr>
        <td>{{'comment'|translate}}</td>
        <td>{{image.Comment}}</td>
      </tr>

      <tr>
        <td>{{'created'|translate}}</td>
        <td>{{image.Created}}</td>
      </tr>

      <tr>
        <td>{{'dockerversion'|translate}}</td>
        <td>{{image.DockerVersion}}</td>
      </tr>

      <tr>
        <td>{{'os'|translate}}</td>
        <td>{{image.Os}}</td>
      </tr>

      <tr>
        <td>{{'parent'|translate}}</td>
        <td>{{image.Parent | limitTo:12}}</td>
      </tr>

      <tr>
        <td>{{'size'|translate}}</td>
        <td>{{image.Size}}</td>
      </tr>
  </table>

 </div> <!-- End of this angular page -->
```
