
# 海鸥的设计与实现

海鸥是使用Go和JavaScript实现的，它使用了如Beego、AngularJS、Bootstrap、Bower、JQuery和Docker等工具。停停停，这并没有你想象的那么复杂。我将会给你介绍海鸥项目的架构和用到的技术。读完这篇文章你就可以实现一个更好的HTTP服务了。

## 概述

海鸥实际上是一个在你本地运行的Web服务。它有一个API服务器不断请求你的Docker本地套接字以获取Docker的数据，这个服务器是使用Beego实现的。Beego同时也会作为一个Web服务器接受请求并返回网页文件。但网页的大部分逻辑都由前端的AngularJS框架控制。我们并没有使用数据库，所以整个网站都是无状态的。我们用到像Bower这样的工具来管理所依赖的JavaScript库，用Bootstrap前端框架来美化所有的页面。我们也用到JQuery.gritter来进行系统通知和Angular-translate来实现多语言支持，这也极大提高了用户体验。让我们从各个组件开始入手吧。

## Web服务器

Web服务器是负责接受HTTP请求并返回HTML文件给浏览器。无论你有什么编程语言，都有很多Web服务器框架供你选择。最终我选用了Beego，是因为它功能齐全、性能好，而且容易上手。

建议阅读<https://github.com/tobegit3hub/seagull/blob/master/docs/2014-10-23-use-beego-as-web-server-zh.md>，我介绍了海鸥是如何实现它的Web服务器的。

阅读完这篇文章，你就知道如何处理HTTP请求和返回一个完整页面吧。但海鸥并不仅仅做到这些，实际上海鸥服务器还能够处理API请求。

## API服务器

API服务器是负责接受HTTP请求并返回指定数据的。在现代的开发中，RESTful(表现状态转移)接口已经是行业标准，所以像海鸥这个的Web服务也应该为前端用户实现RESTful的接口。

建议阅读<https://github.com/tobegit3hub/seagull/blob/master/docs/2014-10-24-use-beego-as-api-server-zh.md>。我将会介绍如何使用Beego开发一个API服务器和海鸥服务器是怎样工作的。

## 前端框架

前端框架对单页应用来说是非常重要的。如果你已经使用过海鸥，你可能发现整个网站速度很快而且数据是动态更新的，这就得益于前端的MVC框架。而且，使用前端框架后代码比纯写JavaScript简洁很多。

建议阅读<https://github.com/tobegit3hub/seagull/blob/master/docs/2014-10-25-use-angulr-zh.md>，我将会告诉你使用AngularJS最简单的方法。

## 管理依赖

目前我们用到的JavaScript库包括angular、angular-route、jquery、bootstrap、jquery.gritter、angular-translate、angular-translate-storage-local和angular-cookies。我们是如何管理这些依赖或者升级某个类库的呢？这时你就需要Bower，一个为Web开发设计的包管理工具。

建议阅读<https://github.com/tobegit3hub/seagull/blob/master/docs/2014-10-26-use-bower-to-manage-dependency-zh.md>。为你的网站添加Bower这个强大的工具是非常简单的。

## 网站样式

正如前面所说，海鸥使用了Bootstrap来为所有网页提供样式。这是一个流行的前端框架，它为我们提供了简洁、漂亮而且标准的用户界面。最好的一点是它让你从手写CSS和JavaScript的繁琐中解脱出来。

建议阅读<https://github.com/tobegit3hub/seagull/blob/master/docs/2014-10-27-how-seagull-use-bootstrap-zh.md>，这里介绍了Bootstrap的基本用法。

## 网站通知

Bootstrap没有未我们提供便利的方式进行通知，但使用JQuery.gritter就好了。这是一个JavaScript库，导入后也无需配置。我想最后说一次，这真的是又易用又好用。

建议阅读<https://github.com/tobegit3hub/seagull/blob/master/docs/2014-10-28-use-jquerygritter-for-notification-zh.md>。我会介绍怎么用这个东西。

## 国际化

支持国际化多种语言对于提高海鸥网站用户体验是非常重要的。特别是母语非英语的用户，可以选择改变界面语言对他们有很大意义。当前，海鸥已完美支持英语、简体中文和繁体中文。Angular-translate是一个很好的项目来帮助我实现国际化的功能。

建议阅读<https://github.com/tobegit3hub/seagull/blob/master/docs/2014-10-18-implement-i18n-with-angular-translate-zh.md>。这介绍了如何为你的Angular项目添加国际化多语言的支持。

## 项目打包

最后我想介绍如何打包海鸥项目。海鸥能够运行在Docker容器中，所以你能够一键安装和启动它，这也是Docker的优势之一。唯一有难度的是如何为这个项目写Dockerfile。

建议阅读<https://github.com/tobegit3hub/seagull/blob/master/docs/2014-10-20-seagull-dockerfile-zh.md>，这讲解了海鸥的Dockerfile和所有细节。
