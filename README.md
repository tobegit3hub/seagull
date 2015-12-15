# Seagull [![Build Status](https://drone.io/github.com/tobegit3hub/seagull/status.png)](https://drone.io/github.com/tobegit3hub/seagull/latest) [![Docker Pulls](https://img.shields.io/docker/pulls/tobegit3hub/seagull.svg)](https://hub.docker.com/r/tobegit3hub/seagull/) [![GoDoc](https://godoc.org/github.com/tobegit3hub/seagull?status.svg)](https://godoc.org/github.com/tobegit3hub/seagull) [![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/tobegit3hub/seagull?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Introduction

**Seagull** is friendly Web UI to manage and monitor docker with full features.

* Easy to install and uninstall within docker container
* One click to start/stop/delete containers and images
* Super fast(<10ms) for searching and filtering
* Support multi-host management and monitoring
* I18n includes English, Chinese, German and French

For more information, go to [dockerseagull.com](http://dockerseagull.com), watch [three-minute video](https://www.youtube.com/watch?v=0BAiSx7l7Y4) and [official slides](https://slides.com/tobychan/how-i-manage).

## Installation

```
docker run -d -p 10086:10086 -v /var/run/docker.sock:/var/run/docker.sock tobegit3hub/seagull
```

## Screenshot

![](https://raw.github.com/tobegit3hub/seagull/master/screenshot.png)

![](https://raw.github.com/tobegit3hub/seagull/master/static/img/containers-page.png)

## Multi-host

Seagull supports monitoring multiple servers. Make sure you start docker daemon like this.

```
docker -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock -api-enable-cors=true -d
```

## Get Involved

Seagull is written in Go with tools like Docker, Beego, AngularJS, Bootstrap and JQuery.

1. Install golang and setup `$GOPATH`
2. `go get github.com/astaxie/beego`
3. `go get github.com/tobegit3hub/seagull`
4. `go build seagull.go`
5. `sudo ./seagull`

More detail in [seagull-design-and-implement](docs/en/development/seagull-design-and-implement.md) and we have excellent documents in [docs](docs/).

## Notice

The [issue #2](https://github.com/tobegit3hub/seagull/issues/2) shows that everyone can access your docker daemon if the IP and port of seagull are exposed. For security, you can bind to localhost to restrict the access.

```
docker run -d -p 127.0.0.1:10086:10086 -v /var/run/docker.sock:/var/run/docker.sock tobegit3hub/seagull
```
