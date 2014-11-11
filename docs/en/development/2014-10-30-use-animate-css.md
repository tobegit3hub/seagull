
# Use Animate.css

Animate.css is the best tool to add animation for your website. It's written in pure CSS and compatible with almost all browsers.

## Official Tutorial

If you're new to animate.css, please go to the official webiste in <http://daneden.github.io/animate.css/>. Or you can visit its Github page in <https://github.com/daneden/animate.css/>.

## How Seagull Uses It

We install animate.css by running `bower install animate.css --save`. You can also download the CSS file in the Github page.

Then we import the CSS file in seagull/views/index.html like this.

```
 <link rel="stylesheet" type="text/css" href="static/bower_components/animate.css/animate.min.css">
```

Currently we just add animation in navigation bar and fade in the page in index.html. The code is simple which just adds some classes for the tags.

```
 <body ng-controller="IndexController" class="animated fadeIn">

 <ul class="nav navbar-nav">
   <li class="animate-nav"><a href="/containers">{{'containers'|translate}}</a></li>
   <li class="animate-nav"><a href="/images">{{'images'|translate}}</a></li>
   <li class="animate-nav"><a href="/configuration">{{'configuration'|translate}}</a></li>
   <li class="animate-nav"><a href="/dockerhub">{{'dockerhub'|translate}}</a></li>
 </ul>
```

Finally we will add the function to active the animation of these items. It's wriiten in seagull/static/js/style.js.

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

It's really simple and the website looks greate after doing that.
