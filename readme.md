
# Seagull

* [中文文档](https://github.com/tobegit3hub/seagull/blob/master/readme-zh.md)
* [![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/tobegit3hub/seagull?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
* [TravisCI]()
* [Docker Hub](https://registry.hub.docker.com/u/tobegit3hub/seagull/)

## Introduction

Seagull is the best friend of docker which providers Web UI to monitor docker deamon.

Everybody wants Web UI for docker and seagull is the most suitable for you. It's super easy to install with one command. You can know everything about your images and containers in this single page application.

Checkout my seagull dashboard in <http://104.131.110.84:10086>.

## Usage

* Run `docker run -d -p 10086:10086 -v /var/run/docker.sock:/var/run/docker.sock tobegit3hub/seagull`.
* And monitor your docker deamon in <http://127.0.0.1:10086>.
* For boot2docker users, run `boot2docker ip` to find out the real ip.

## Screenshot

![](https://raw.github.com/tobegit3hub/seagull/master/screenshot.png)

![](https://raw.github.com/tobegit3hub/seagull/master/static/img/containers-page.png)

![](https://raw.github.com/tobegit3hub/seagull/master/static/img/images-page.png)

![](https://raw.github.com/tobegit3hub/seagull/master/static/img/configuration-page.png)

## Development

Seagull is implemented in Go with tools like Beego, AngularJS, Bootstrap, Bower, Docker and TravisCI. You can fork the repository and send pull-request as you want.

* Setup go path and try `echo $GOPATH`
* `go get github.com/astaxie/beego`
* `go get github.com/beego/bee`
* `git clone https://github.com/tobegit3hub/seagull.git $GOPATH/src/github.com/tobegit3hub/seagull/`
* `go build seagull.go` or `bee run seagull` to dubug
* `./seagull` or `sudo ./seagull` to access /var/run/docker.sock

