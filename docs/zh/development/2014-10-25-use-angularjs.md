
# 使用AngularJS

## 官方教程

如果你刚接触AngularJS，你可以阅读它的官方教程，<https://docs.angularjs.org/tutorial>。读完以后，我基本知道我要实现一个单页应用所应该知道的知识。

你也可以到W3school学习关于AngularJS的知识，地址在<http://www.w3schools.com/angular/default.asp>。

## 如何使用它

在你的项目中使用AngularJS是很简单的。我正在使用Bower，只需要运行`bower install angular --save`和`bower install angular-router --save`酒可以下载它们的类库了。你也可以到官方网站去下载这些JS文件。

然后我们可以把它导入HTML文件中、编写控制器和在HTML文件中使用AngularJS标签。更详细的AngularJS基本教程请参考上面的官方教程。

## 海鸥如何使用它

### 导入类库

我们已经在seagull/views/index.html文件中导入AngularJS。

```
 <script src="static/bower_components/angular/angular.min.js"></script>
 <script src="static/bower_components/angular-route/angular-route.min.js"></script>
 <script src="static/js/app.js"></script>
 <script src="static/js/controllers.js"></script>
```

### 模块和路由

我们定义了AngularJS应用默认和路由，在seagull/static/js/app.js文件中。

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

### 控制器

所有的控制器都是在seagull/static/js/controllers.js中实现的。

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

### HTML视图

然后我们可以就使用AngularJS标签，在seagull/static/html/image.html中。

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
