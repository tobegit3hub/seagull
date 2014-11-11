
# Write Seagull Dockerfile

Dockerfile is the recommendatory way to build the docker image. Everyone can setup and run seagull with `docker run -d -p 10086:10086 -v /var/run/docker.sock:/var/run/docker.sock tobegit3hub/seagull` because we has built the image and pushed to docker hub.

The only problem for us is how to write the Dockerfile.

## How To Write Dockerfile

Let me tell you how we implement the Dockerfile of seagull.

First of all, you need to know the development guide in readme.md. It introduces how to setup seagull development environment in local host.

* Setup go path and try `echo $GOPATH`
* `go get github.com/astaxie/beego`
* `go get github.com/beego/bee`
* `go get github.com/tobegit3hub/seagull`
* `go build seagull.go` or `bee run seagull` for dubuging
* `./seagull` or `sudo ./seagull` to access /var/run/docker.sock

It's the normal way to build seagull. It's a go project so you need to setup go path and `go get` the dependent libraries. Then please have a look at the simplied Dockerfile below.

```
FROM golang
RUN go get github.com/astaxie/beego
RUN go get github.com/beego/bee
RUN go get github.com/tobegit3hub/seagull
WORKDIR /go/src/github.com/tobegit3hub/seagull/
RUN go build seagull.go
EXPOSE 10086
CMD ["./seagull"]
```

Maybe you have noticed something. The processes of Dockerfile are almost the same as the development guide. This is how we write the Dockerfile.

If we need to some dependent libraries, we run `go get` to download. If we want to compile the project, we run `go build`. The Dockerfile just does these for us automatically. Once you have written the Dockerfile, you can push to docker hub and everyone can run it with one command.

## Any Problem?

If you have any problem about this, don't hesitate to contact me.
