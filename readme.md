
# Seagull
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/tobegit3hub/seagull?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

* [IRC]()
* [TravisCI]()
* [Docker Hub]()

## Introduction

Seagull is the best friend of docker which providers Web UI to monitor deamon.

Everybody wants Web UI for docker and seagull is the most suitable for you. It's super easy to install through one command. You can know all about images and containers in this single page application.

## Usage

* After installing docker
* Run `docker run -d -p 10086:10086 tobegit3hub/seagull`
* And monitor containers in `http://127.0.0.1:10086`

## Screenshot

## Development

Seagull is implemented in Go with tools like Beego, AngularJS, Bootstrap, Bower, Docker and TravisCI. You can fork the repository and send pull-request as you want.

* `git clone git@github.com:tobegit3hub/seagull.git`
* `go get github.com/astaxie/beego`
* `go get github.com/beego/bee`
* `bee run seagull`
