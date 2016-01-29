package routers

import (
	"github.com/astaxie/beego"
	"github.com/tobegit3hub/seagull/controllers"
)

func init() {
	/* Pass to Angular router */
	beego.Router("/", &controllers.MainController{})
	beego.Router("/containers", &controllers.MainController{})
	beego.Router("/containers/:id", &controllers.MainController{})
	beego.Router("/images", &controllers.MainController{})
	beego.Router("/images/:id", &controllers.MainController{})
	beego.Router("/images/:user/:repo", &controllers.MainController{})
	beego.Router("/configuration", &controllers.MainController{})
	beego.Router("/dockerhub", &controllers.MainController{})

	/* HTTP API for docker remote API */
	beego.Router("/dockerapi/containers/json", &controllers.DockerapiController{}, "get:GetContainers")
	beego.Router("/dockerapi/containers/:id/json", &controllers.DockerapiController{}, "get:GetContainer")
	beego.Router("/dockerapi/containers/:id/top", &controllers.DockerapiController{}, "get:TopContainer")
	beego.Router("/dockerapi/containers/:id/start", &controllers.DockerapiController{}, "post:StartContainer")
	beego.Router("/dockerapi/containers/:id/stop", &controllers.DockerapiController{}, "post:StopContainer")
	beego.Router("/dockerapi/containers/:id", &controllers.DockerapiController{}, "delete:DeleteContainer")
	beego.Router("/dockerapi/containers/:id/stats", &controllers.DockerapiController{}, "get:GetContainerStats")
	beego.Router("/dockerapi/images/json", &controllers.DockerapiController{}, "get:GetImages")
	beego.Router("/dockerapi/images/:id/json", &controllers.DockerapiController{}, "get:GetImage")
	beego.Router("/dockerapi/images/:user/:repo/json", &controllers.DockerapiController{}, "get:GetUserImage")
	beego.Router("/dockerapi/images/:id", &controllers.DockerapiController{}, "delete:DeleteImage")
	beego.Router("/dockerapi/version", &controllers.DockerapiController{}, "get:GetVersion")
	beego.Router("/dockerapi/info", &controllers.DockerapiController{}, "get:GetInfo")
	beego.Router("/dockerapi/images/search", &controllers.DockerapiController{}, "get:GetSearchImages")
	// beego.Router("/dockerapi/events", &controllers.DockerapiController{}, "get:GetEvents") // Not support yet
	beego.Router("/dockerapi/_ping", &controllers.DockerapiController{}, "get:Ping")
        beego.Router("/dockerapi/containers/:id/restart", &controllers.DockerapiController{}, "post:RestartContainer")
}
