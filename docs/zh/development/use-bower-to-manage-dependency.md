
# 使用Bower来管理依赖

Bower是为Web设计的工具来管理依赖。海鸥也使用了Bower来管理我们的JavaScript依赖。问什么我们不直接下载JS文件来用呢？因为这不是一种标准的方法而且难以维护。另一个问题是想要升级依赖的类库是很不方便的。

## 官方教程

在阅读海鸥代码之前，你需要先到它的官方网站，<http://bower.io>。那里有Bower的简单教程，而它正是那么简单。

## 如何使用它

要开始使用Bower，你需要一个名为bower.json的文件。它可以通过命令`bower init`来创建。

运行`bower init`后，它会问你一些关于你的项目的问题。输入你的答案后这个文件就会在当前目录创建了。

然后你可以安装类库了。对海鸥来说，我们执行了下面几个命令。

* `bower install angular --save`
* `bower install angular-route --save`
* `bower install jquery --save`
* `bower install bootstrap --save`
* `bower install jquery.gritter --save`
* `bower install angular-translate --save`
* `bower install angular-cookies --save`
* `bower install angular-translate-storage-local --save`

这是我们所做的所有事情。这些类库都会下载到bower_components文件夹中。

你可以通过`bower update`来更新类库，但我不会介绍这些内容因为我还没用过呢。

## 是否有疑问？

如果你有任何疑问，请不要犹豫马上联系我。
