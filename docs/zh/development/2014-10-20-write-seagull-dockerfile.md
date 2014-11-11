
# 编写海鸥的Dockerfile

Dockerfile是构建Docker镜像的推荐方法。任何人都可以通过`docker run -d -p 10086:10086 -v /var/run/docker.sock:/var/run/docker.sock tobegit3hub/seagull`来安装和运行海鸥，这得益于我们已经构建好镜像并上传到Docker Hub中。

对我们来说唯一的问题就是该如何写Dockerfile。

## 如何写Dockerfile

那就让我来告诉你我们是如何为海鸥写Dockerfile的。

首先，你需要看看readme.md中的开发指南。它介绍了如何在本机上搭建海鸥开发环境。

* 配置Go路径然后尝试`echo $GOPATH`
* `go get github.com/astaxie/beego`
* `go get github.com/beego/bee`
* `go get github.com/tobegit3hub/seagull`
* `go build seagull.go`或者运行`bee run seagull`来调试
* `./seagull`或者运行`sudo ./seagull`来访问/var/run/docker.sock

这是构建海鸥的标准方式。它是一个Go项目所以你需要配置Go路径并且通过`go get`来下载依赖的类库。然后请大家看看下面简化版的Dockerfile。

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

也许你已经发现什么了。Dockerfile中的执行流程跟开发指南的几乎一模一样。这就是我们编写Dockerfile的方法。

如果我们需要一些依赖的类库，我们就执行`go get`来下载。如果我们想要编译这个项目，我们就执行`go build`。Dockerfile仅仅是为我们自动做这些事情而已。一旦你已经写好了Dockerfile，你就可以上传到Docker Hub，然后所有人都可以一键运行它了。

## 是否有疑问？

如果你对这篇文章有任何疑问，请不要犹豫马上联系我。
