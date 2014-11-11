
# 使用Beego作为API服务器

## 官方教程

这里是Beego的官方网站，<http://beego.me/>。

你最好先阅读[Web](2014-10-23-use-beego-as-web-server.md)

## 海鸥如何使用它

目前海鸥已经实现了一些关于Docker的API，你可以在seagull/routers/router.go找到它们。

```
beego.Router("/dockerapi/containers/json", &controllers.DockerapiController{}, "get:GetContainers")
beego.Router("/dockerapi/containers/:id/json", &controllers.DockerapiController{}, "get:GetContainer")
beego.Router("/dockerapi/containers/:id/top", &controllers.DockerapiController{}, "get:TopContainer")
beego.Router("/dockerapi/containers/:id/start", &controllers.DockerapiController{}, "post:StartContainer")
beego.Router("/dockerapi/containers/:id/stop", &controllers.DockerapiController{}, "post:StopContainer")
beego.Router("/dockerapi/containers/:id", &controllers.DockerapiController{}, "delete:DeleteContainer")
beego.Router("/dockerapi/images/json", &controllers.DockerapiController{}, "get:GetImages")
beego.Router("/dockerapi/images/:id/json", &controllers.DockerapiController{}, "get:GetImage")
beego.Router("/dockerapi/images/:user/:repo/json", &controllers.DockerapiController{}, "get:GetUserImage")
beego.Router("/dockerapi/images/:id", &controllers.DockerapiController{}, "delete:DeleteImage")
beego.Router("/dockerapi/version", &controllers.DockerapiController{}, "get:GetVersion")
beego.Router("/dockerapi/info", &controllers.DockerapiController{}, "get:GetInfo")
beego.Router("/dockerapi/images/search", &controllers.DockerapiController{}, "get:GetSearchImages")
```

而这些API的实现细节在seagull/controllers/dockerapi.go文件中。

我将会那下面这个为例子。

```
/* Wrap docker remote API to get docker info */
func (this *DockerapiController) GetInfo() {
  address := "/info"
  result := RequestUnixSocket(address, "GET")
  this.Ctx.WriteString(result)
}
```

它请求了Docker的Unix套接字并返回JSON数据给前端框架。你也可以访问这个URL或者使用`curl`来获得这些数据。

实现API的最佳实践是定义为RESTful接口。
