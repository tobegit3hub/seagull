
# Implement I18n With Angular-translate

I18n(internationalization) means that your webiste support multiple languages. It's not a functional requirement but it would highly improve the user experience of non-English users.

If you have experienced seagull, you may know that it has perfectly supported English, simplied Chinese and traditional Chinese. It's implemented with angular-translate library. So I will take this as example and tell you know to implement i18n in your angular project.

## Official Tutorial

First of all, you should go to official home page of angular-translate, <http://angular-translate.github.io>. You should know it's for i18n and only works in angular projects.

Here's a official post to use angular-translate in the easiest way, <http://www.ng-newsletter.com/posts/angular-translate.html>.

## Import Angular-translate Library

Seagull use Bower to mange the dependency of JavaScript libraries. So you can simply run `bower install angular-translate --save` to download the angular-translate library.

Then you need to include it in your HTML file. Here's the source code in seagull/views/index.html.

```
 <script src="static/bower_components/angular-translate/angular-translate.min.js"></script>
```

It's in index.html page so that each page will include this library. If you're no familiar with Bower, please refer to [use-bower-to-manage-dependency](2014-10-26-use-bower-to-manage-dependency.md).

If you don't want to use Bower, just download the js file from the official website and put it in the appropriate path.

## How To Use It

The official post above has introduced the simple usage in detail. I just explain how seagull use it which is equally easy.

Firstly I add the module pascalprecht.translate in seagull/static/js/app.js.

```
var seagull = angular.module('seagull', [
  'ngRoute',
  'seagullControllers',
  'ngCookies', // To save perference of i18n language
  'pascalprecht.translate'
]);
```

Then I add $translateProvider object and the content of translation in the same app.js.

```
seagull.config(function ($translateProvider) {
  /* Use cookie to store the perference of i18n language */
  $translateProvider.useCookieStorage();

  /* The default language should be English */
  $translateProvider.preferredLanguage('en-us');

  /* Translate into English */
  $translateProvider.translations('en-us', {
    // Index html
    seagull: 'Seagull',
    containers: 'Containers',
    images: 'Images',
    configuration: 'Configuration',
    more: 'More',
    need_help: 'Need Help',
  });

   /* Translate into simplified Chinese */
  $translateProvider.translations('zh-cn', {
    // Index html
    seagull: '海鸥',
    containers: '容器',
    images: '镜像',
    configuration: '配置',
    more: '更多',
    need_help: '帮助',
  });

  /* Translate into traditional Chinese */
  $translateProvider.translations('zh-hant', {
    // Index html
    seagull: '海鷗',
    containers: '容器',
    images: '鏡像',
    configuration: '配置',
    more: '更多',
    need_help: '幫助',
  });
});
```

But how can we change the current language? We need a controller to change the value of ``$translate.use()``. The code is in the same app.js as well.

```
seagull.controller('IndexController', function ($scope, $translate) {
  /* Change languages with the language string */
  $scope.changeLanguage = function (key) {
    $translate.use(key);
  };

  /* Determine it is English or not */
  $scope.isEnUs = function () {
     return $translate.use() == "en-us";
  }

  /* Determine it is simplified Chinese or not */
  $scope.isZhCn = function () {
	   return $translate.use() == "zh-cn";
  }

  /* Determine it is traditional Chinese or not */
  $scope.isZhHant = function () {
     return $translate.use() == "zh-hant";
  }
});
```

Then we can use it all our HTML files. I will take seagull/views/index.html for example.

```
<a class="navbar-brand" href="/">{{'seagull'|translate}}</a>

<li><a href="/containers">{{'containers'|translate}}</a></li>
<li><a href="/images">{{'images'|translate}}</a></li>
<li><a href="/configuration">{{'configuration'|translate}}</a></li>
```

## Use Cookie To Remember Language

The change of language is just for one time. When you refresh the page, the value of $translate.use() will be reset. If you want to remember the choice of your preference, you need cookies or local storage to store it.

Fortunately we have found the great projects, angular-cookies and angualar-translate-storage. You should refer to their official page first, <https://github.com/angular/bower-angular-cookies> and <https://github.com/angular-translate/bower-angular-translate-storage-cookie>.

So I ran `bower install angular-cookies --save` and `bower install angular-translate-storage-cookies --save` to download the libraries and include it in seagull/views/index.html.

```
 <script src="static/bower_components/angular-cookies/angular-cookies.min.js"></script>
 <script src="static/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js"></script>
 <script src="static/bower_components/angular-translate-storage-local/angular-translate-storage-local.min.js"></script>
```

The other things I have to do is adding code in seagull/static/js/app.js.

```
var seagull = angular.module('seagull', [
  'ngRoute',
  'seagullControllers',
  'ngCookies', // To save perference of i18n language
  'pascalprecht.translate'
]);
```

```
seagull.config(function ($translateProvider) {
  /* Use cookie to store the perference of i18n language */
  $translateProvider.useCookieStorage();
});
```

## Any Problem?

That's all about the usage of angular-translate in seagull. If you have any problem, don't hesitate to contact me.
