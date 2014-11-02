
# Seagull

* [中文文档](readme-zh.md)
* [Docker Hub](https://registry.hub.docker.com/u/tobegit3hub/seagull/)
* [![Build Status](https://drone.io/github.com/tobegit3hub/seagull/status.png)](https://drone.io/github.com/tobegit3hub/seagull/latest)
* [![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/tobegit3hub/seagull?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Introduction

Seagull is the best friend of docker which provides Web UI to monitor docker daemon.

Everybody wants Web UI for docker and seagull is the most suitable one for you. It's super easy to install with one command. You can know everything about your images and containers in this single page application. Now English, simplified Chinese and traditional Chinese are perfectly supported!

Welcome to watch the [three-minute presentation](https://www.youtube.com/watch?v=0BAiSx7l7Y4) or go to the [demo website](http://96.126.127.93:10086).

## Usage

* Run `docker run -d -p 10086:10086 -v /var/run/docker.sock:/var/run/docker.sock tobegit3hub/seagull`.
* Then monitor your docker daemon in <http://127.0.0.1:10086>.
* For boot2docker users, please run `boot2docker ip` to find out the real IP.

## Screenshot

![](https://raw.github.com/tobegit3hub/seagull/master/screenshot.png)

![](https://raw.github.com/tobegit3hub/seagull/master/static/img/containers-page.png)

![](https://raw.github.com/tobegit3hub/seagull/master/static/img/images-page.png)

![](https://raw.github.com/tobegit3hub/seagull/master/static/img/configuration-page.png)

## Get Involved

Seagull is implemented in Go and JavaScript with tools like Beego, AngularJS, Bootstrap, Bower, JQuery and Docker. You can fork the repository and send pull-request as you want.

* Setup go path and try `echo $GOPATH`
* `go get github.com/astaxie/beego`
* `go get github.com/beego/bee`
* `go get github.com/tobegit3hub/seagull`
* `go build seagull.go` or `bee run seagull` for dubuging
* `./seagull` or `sudo ./seagull` to access /var/run/docker.sock

More detail in [seagull-design-and-implement](docs/2014-10-14-seagull-design-and-implement.md) and we have excellent documents in [docs](https://github.com/tobegit3hub/seagull/tree/master/docs).

## Notice

The [issue #2](https://github.com/tobegit3hub/seagull/issues/2) shows that everyone can access your docker daemon if the IP and port of seagull are exposed. For security, you can bind localhost or 127.0.0.1 to restrict to access seagull locally.

Then run `docker run -d -p 127.0.0.1:10086:10086 -v /var/run/docker.sock:/var/run/docker.sock tobegit3hub/seagull`.
