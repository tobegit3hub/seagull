
# Angular-translate实现国际化

国际化意味着你的网站必须支持多种语言。这并不是一个功能需求，但对于母语不是英语的用户，这极大提高了用户的使用体验。

如果你已经使用过海鸥，你可能觉得它已经能够完美地支持英语、简体中文和繁体中文。这是通过Angular-translate这个类库类实现的。因此我将会以海鸥为例子，告诉你如在你的AngularJS项目中实现国际化。

## 官方教程

首先，你应该去Angular-translate的官网上看看，<http://angular-translate.github.io>。你应该这个类库是为了实现国际化并且只能在AngularJS项目中使用。

这里有一篇最简单地使用Angular-translate的官方博客，<http://www.ng-newsletter.com/posts/angular-translate.html>。

## 导入Angular-translate类库

海鸥使用了Bower来管理JavaScript类库的依赖。所以你可以简单地运行`bower install angular-translate --save`来下载Angular-translate包。

然后你需要将它引入你的HTML问题。这里是seagull/views/index.html文件的源代码。

```
 <script src="static/bower_components/angular-translate/angular-translate.min.js"></script>
```

这是index.html首页页面，其他页面都嵌入在它里面，所以它能保证所有页面都所有页面都引入了这个类库。如果你不熟悉Bower，建议阅读[使用Bower来管理依赖](2014-10-26-use-bower-to-manage-dependency.md)。

如果你不想使用Bower，只需要从官网中下载JS文件然后把它放到合适的目录。

## 如何使用Angular-translate

前面的官方博客已经详细介绍了最简单的使用方法。那我就解释一下海鸥是如何使用它的，这也同样简单。

首先，我添加了pascalprecht.translate模块，在seagull/static/js/app.js文件中。

```
var seagull = angular.module('seagull', [
  'ngRoute',
  'seagullControllers',
  'ngCookies', // To save perference of i18n language
  'pascalprecht.translate'
]);
```

然后我增加$translateProvider对象和翻译的内容，在同一个app.js文件中。

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

但是我们该如何修改当前语言呢？我们需要一个Controller来修改``$translate.use()``的值。实现代码页在那个app.js文件中。

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

然后我们就可以在所有HTML文件中使用了。我以seagull/views/index.html为例子显示一下。

```
<a class="navbar-brand" href="/">{{'seagull'|translate}}</a>

<li><a href="/containers">{{'containers'|translate}}</a></li>
<li><a href="/images">{{'images'|translate}}</a></li>
<li><a href="/configuration">{{'configuration'|translate}}</a></li>
```

## 使用Cookie来记住语言选择

语言的修改其实仅仅是一次性的。当你刷新了页面，`$translate.use()`的值就会被重设。如果你想记住你之前的选择，你需要Cookies或者本地存储来保存它。

幸运的是我们找到了两个优秀的项目，Angular-cookies和Angualar-translate-storage。你可以先参考他们的官方这也，<https://github.com/angular/bower-angular-cookies>和<https://github.com/angular-translate/bower-angular-translate-storage-cookie>。

因此我执行了`bower install angular-cookies --save`和`bower install angular-translate-storage-cookies --save` 来下载这些类库并引入到seagull/views/index.html文件中。

```
 <script src="static/bower_components/angular-cookies/angular-cookies.min.js"></script>
 <script src="static/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js"></script>
 <script src="static/bower_components/angular-translate-storage-local/angular-translate-storage-local.min.js"></script>
```

剩下我要做的事情就是在seagull/static/js/app.js加入下面相关的代码。

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

## 是否有疑问？

这就是海鸥使用Angular-translate的全部代码。如果你有任何疑问，请不要犹豫马上联系我。
