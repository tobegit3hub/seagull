
# 访问Docker远程API

Docker远程API是从Docker后台程序获取数据的接口。

## 官方教程

这里是Docker文档的官方网站，<https://docs.docker.com/reference/api/docker_remote_api/>。

你可以知道Docker远程API的所有细节。但怎样使用它呢？实际上有两种方法，使用Unix套接字或者HTTP端口。

## Unix套接字远程API

Docker默认会监听unix:///var/run/docker.sock这个Unix套接字。

我对Unix套接字也不太熟悉，它有点像一个通信的管道。你可以从这个文件中获得Docker的数据。

但我们需要写程序来访问它。幸运的是，我们找到了curl-unix-socket这个项目，地址是<https://github.com/Soulou/curl-unix-socket>。你可以通过`go get github.com/Soulou/curl-unix-socket`安装它，然后运行`curl-unix-socket unix:///var/run/docker.sock:/images/json`来测试。

这是很有用的，你可以获得所有Docker信息来监控你的Docker后台进程。但这是个命令行工具而且它只能像Docker客户端那样工作。

因此海鸥复用了它的代码，从Docker后台进程中获得数据。这是最便利的方法，无需额外的操作。

## HTTP远程API

你也可以使用HTTP远程API。但你必须手动暴露这个端口。

首先你需要通过`service docker stop`停止Docker后台进程。然后加上参数重启它，就像这样`docker -d -H unix:///var/run/docker.sock -H 0.0.0.0:4243 &`。现在你可以在浏览器测试它，或者直接运行`curl -X GET http://127.0.0.1:4243`。


HTTP远程API是很有用的，但它要求用户重启Docker后台进程。

## Docker客户端

如果你不是要开发一个海鸥这样的工具，我觉得Docker客户端已经够用了。你可以用Docker客户端做任何操作，而且它是官方支持的。
