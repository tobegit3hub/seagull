
# Use Beego As API Server

## Official Tutorial

Here is the official website of Beego, <http://beego.me/>.

And you have to read [Use Beego as web server](2014-10-23-use-beego-as-web-server.md) first.

## How Seagull Uses It

Currently seagull has implemented some APIs about docker. You can check it out in seagull/routers/router.go.

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

And the detail of these APIs is in seagull/controllers/dockerapi.go.

I will take the simple for example.

```
/* Wrap docker remote API to get docker info */
func (this *DockerapiController) GetInfo() {
  address := "/info"
  result := RequestUnixSocket(address, "GET")
  this.Ctx.WriteString(result)
}
```

This requests the docker unix socket and return the JSON data to front-end framework. You can also go to this url or just `curl` to get the data.

The best practice is to implement the API as RESTful interfaces.
