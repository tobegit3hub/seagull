# Seagull translate guide

## Support I18n

Now seagull support multiple languages including English, Chinese, German and French.

We're using angular-translate library to implement i18n. If you want to support new languages, just add the translation in the code and seagull will use it automatically.

## Translate guide

Before writing the code, your can refer to [pr#19](https://github.com/tobegit3hub/seagull/pull/19) and [pr#26](https://github.com/tobegit3hub/seagull/pull/26) to know about the code of translation.

All you need is translating the basic words in [seagull/static/js/app.js](https://github.com/tobegit3hub/seagull/blob/master/static/js/app.js). Just copy-and-paste the codes from English section and translate them in your languages.

And make sure to write the following function so that we can change the language easily.

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

Finally, add your button in the front-end page [seagull/views/index.html](https://github.com/tobegit3hub/seagull/blob/master/views%2Findex.html).

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