
# 使用Animate.css

Animate.css是为你网站添加动画最好的工具。它是纯CSS实现并且兼容几乎所有浏览器。

## 官方教程

如果你刚接触animate.css，请到它的官方网站看看，<http://daneden.github.io/animate.css/>。或者可以参考它的Github页面，<https://github.com/daneden/animate.css/>.

## Seagull如何使用它

我们通过执行`bower install animate.css --save`来安装animate.css。你也可以在他的Github页面上下载CSS文件。

然后我们在seagull/views/index.html文件中导入这个CSS文件。

```
 <link rel="stylesheet" type="text/css" href="static/bower_components/animate.css/animate.min.css">
```

目前我们只添加了导航栏动画和首页的渐入。代码很简单，仅仅未这些HTML标签加了一些类。

```
 <body ng-controller="IndexController" class="animated fadeIn">

 <ul class="nav navbar-nav">
   <li class="animate-nav"><a href="/containers">{{'containers'|translate}}</a></li>
   <li class="animate-nav"><a href="/images">{{'images'|translate}}</a></li>
   <li class="animate-nav"><a href="/configuration">{{'configuration'|translate}}</a></li>
   <li class="animate-nav"><a href="/dockerhub">{{'dockerhub'|translate}}</a></li>
 </ul>
```

最后我们为这些项添加了函数来激活动画，代码在seagull/static/js/style.js文件中。

```
$(function(){
    /* Animation for nav in index page */
    $('.animate-nav').hover(function(){
        $(this).addClass('animated pulse');
    },function(){
        $(this).removeClass('animated pulse');
    });
});
```

使用animate.css是很简单的，并且使用它后网站看起来更加棒了。

