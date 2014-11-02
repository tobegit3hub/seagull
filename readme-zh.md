
# 海鸥

* [English Edition](readme.md)
* [Docker仓库](https://registry.hub.docker.com/u/tobegit3hub/seagull/)
* [![Build Status](https://drone.io/github.com/tobegit3hub/seagull/status.png)](https://drone.io/github.com/tobegit3hub/seagull/latest)
* [![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/tobegit3hub/seagull?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## 简介

海鸥是Docker的最佳小伙伴，它为Docker实现了一套Web监控页面。

使用Docker都希望有Web监控和管理界面，海鸥就是为此量身订造的。它可以通过一行命令安装运行，你在此能够监控你的所有Docker容器和镜像。现在，海鸥已经完美支持英语、简体中文和繁体中文了！

欢迎观看[三分钟演示视频](http://v.youku.com/v_show/id_XODEzOTUzMTgw.html)，或者到[Demo网站](http://96.126.127.93:10086)试用。

## 使用

* 运行`docker run -d -p 10086:10086 -v /var/run/docker.sock:/var/run/docker.sock tobegit3hub/seagull`。
* 然后在这个地址<http://127.0.0.1:10086>监控你的Docker容器。
* 对于boot2docker用户，请运行`boot2docker ip`找到真正的IP地址。

## 截图

![](https://raw.github.com/tobegit3hub/seagull/master/screenshot.png)

![](https://raw.github.com/tobegit3hub/seagull/master/static/img/containers-page.png)

![](https://raw.github.com/tobegit3hub/seagull/master/static/img/images-page.png)

![](https://raw.github.com/tobegit3hub/seagull/master/static/img/configuration-page.png)

## 参与开发

海鸥是用Go和JavaScript实现的，使用了Beego、AngularJS、Bootstrap、Bower、JQuery和Docker等工具。你可以Fork这个项目并且按你的需求发送Pull-request。

* 配置Go路径然后尝试`echo $GOPATH`
* `go get github.com/astaxie/beego`
* `go get github.com/beego/bee`
* `go get github.com/tobegit3hub/seagull`
* `go build seagull.go`或者运行`bee run seagull`来调试
* `./seagull`或者运行`sudo ./seagull`来访问/var/run/docker.sock

更多细节可以参考[海鸥的设计与实现](docs/2014-10-14-seagull-design-and-implement-zh.md)，我们在[docs](https://github.com/tobegit3hub/seagull/tree/master/docs)还有非常优秀的文档。

## 注意

[Issue #2](https://github.com/tobegit3hub/seagull/issues/2)表示一旦你暴露了IP和海鸥的端口，任何人都可以直接访问你的Docker守护进程。为了提高安全性，你可以绑定localhost或127.0.0.1来限制只有本地才能访问Seagull。

然后执行`docker run -d -p 127.0.0.1:10086:10086 -v /var/run/docker.sock:/var/run/docker.sock tobegit3hub/seagull`。
