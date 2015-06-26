# 海鸥翻译指南

## 支持国际化

目前海鸥已经支持多种语言，包括英语、简体中文、繁体中文、德语和法语。

我们使用angular-translate这个库来实现国际化。如果是想支持新的语言，只需在代码中加上相应的翻译，然后海鸥会自动加载。

## 翻译指南

在写实际代码之前，可以参考[pr#19](https://github.com/tobegit3hub/seagull/pull/19)和[pr#26](https://github.com/tobegit3hub/seagull/pull/26)， 大概了解需要修改的代码。

你所需要做的就是翻译这些基本单词，[seagull/static/js/app.js](https://github.com/tobegit3hub/seagull/blob/master/static/js/app.js)。 只要复制英语这部分的代码，并且用你的语言翻译出来。

然后确认你写了下面的函数，这样系统就可以轻易切换语言。

```
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

/* Determine it is German or not */
$scope.isDeDe = function () {
 return $translate.use() == "de-de";
}

/* Determine it is French or not */
$scope.isFrFr = function () {
 return $translate.use() == "fr-fr";
}
```

最后，在前端页面上加上你的按钮，[seagull/views/index.html](https://github.com/tobegit3hub/seagull/blob/master/views%2Findex.html)。

```
<!-- A more button to change i18n languages and email me -->
<ul class="nav navbar-nav navbar-right">
<li class="dropdown">
  <a class="dropdown-toggle animate-nav" data-toggle="dropdown" href="">{{'more'|translate}} <span class="caret"></span></a>
  <ul class="dropdown-menu" role="menu">
    <li class="animate-nav" ng-hide="isEnUs()"><a href="" ng-click="changeLanguage('en-us')">{{'en_us'|translate}}</a></li>
    <li class="animate-nav" ng-hide="isZhCn()"><a href="" ng-click="changeLanguage('zh-cn')">{{'zh_cn'|translate}}</a></li>
    <li class="animate-nav" ng-hide="isZhHant()"><a href="" ng-click="changeLanguage('zh-hant')">{{'zh_hant'|translate}}</a></li>
    <li class="animate-nav" ng-hide="isDeDe()"><a href="" ng-click="changeLanguage('de-de')">{{'de_de'|translate}}</a></li>
    <li class="animate-nav" ng-hide="isFrFr()"><a href="" ng-click="changeLanguage('fr-fr')">{{'fr_fr'|translate}}</a></li>
    <li class="animate-nav"><a href="https://github.com/tobegit3hub/seagull/issues/new" target="_top">{{'need_help'|translate}}</a></li>
  </ul>
</li>
```