
# 使用Godep管理依赖

Godep是一个工具来管理Go的依赖。它解决这样一个问题，以前如果海鸥依赖的Beego升级了，海鸥有可能就不能运行了。

## 官方教程

这是Godep的Github页面，<https://github.com/tools/godep>。

这里有一个使用的例子，你可以到<http://www.goinggo.net/2013/10/manage-dependencies-with-godep.html>看看。

## 海鸥如何使用它

你是否已经主要到名为Godeps的目录？它是Godep自动生成的，并且包含了我们所有Go项目依赖的源代码。

我们简单地运行`godep save`，然后当前的Beego项目就直接下载到Godeps。

它确保了当前版本的Beego十稳定的，如果我们使用`godep go build`一定会编译成功。

通常，使用`go get`和`go build`也没问题，但我们为了稳定性还是用了`godep`。
