
# Use Bower To Manage Dependency

Bower is the tool to manage dependency for web. Seagull also uses Bower to manage our JavaScript dependency. Why don't we just download the js files to use? Because it's not a standard way and hard to maintain. One more problem is that it's inconvenient to upgrade the dependent libraries.

## Official Tutorial

Before reading the code of seagull, you need to go to the official website first, <http://bower.io>. There's a simple tutorial of Bower and it's just that easy.

## How To Use It

To start to use Bower, we need a bower file which is named bower.json. It can be created by the command `bower init`.

After running `bower init`, it will ask a few question about your project. Just input your answers and it will be created in the local directory.

Then you can intall libraries. For seagull, we run the following commands.

* `bower install angular --save`
* `bower install angular-route --save`
* `bower install jquery --save`
* `bower install bootstrap --save`
* `bower install jquery.gritter --save`
* `bower install angular-translate --save`
* `bower install angular-cookies --save`
* `bower install angular-translate-storage-local --save`

That's all. The libraries will be downloaded in the bower_components.

You can upgrade the libraries with `bower update` but I will not introduce more because I haven't used it yet.


## Any Problem?

If you have any problem, don't hesitate to contact me.
