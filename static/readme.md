
# Static

There're all the resources of seagull in this directory.

## Bower.json

We use Bower to mange the dependency of JavaScript libraries. This file is generated after running `bower init`.

And we have run the following commands to download our dependent libraries.

* `bower install angular --save`
* `bower install angular-route --save`
* `bower install jquery --save`
* `bower install bootstrap --save`
* `bower install jquery.gritter --save`
* `bower install angular-translate --save`
* `bower install angular-cookies --save`
* `bower install angular-translate-storage-local --save`
* `bower install animate.css --save`

## Bower_components

All the dependent libraries which are downloaded by Bower will be put in this directory. You don't need to change anything and just use the js files here.

## Css

We have write a little CSS code and put it in style.css.

Because we're using Bootstrap, so actually we don't have to write a lot of code to style our website.

## Html

All our AngularJS pages are placed here so that the browser can download it.

Currently there're seven pages including home, containers, container, images, image, configuration and dockerhub pages.

## Img

We put all our image resources in this directory.

There're a few images for home page and the favicon of seagull.

## Js

Finally we introduce all our JavaScript files in this folder.

The AngularJS code of applicaton and controllers is in app.js and controllers.js. It maintains the main logic of the whole website.

By the way, we have added some helper JavaScript functions in style.js here.

Currently Chinese is maintained by [tobegit3hub](https://github.com/tobegit3hub) and [MorrisJobke](https://github.com/MorrisJobke) is the maintainer of German.
