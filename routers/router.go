package routers

import (
	"github.com/astaxie/beego"
	"github.com/tobegit3hub/seagull/controllers"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/containers", &controllers.MainController{})
	beego.Router("/containers/:id", &controllers.MainController{})
	beego.Router("/images", &controllers.MainController{})
	beego.Router("/images/:id", &controllers.MainController{})
	beego.Router("/images/:user/:repo", &controllers.MainController{})

	beego.Router("/dockerapi/containers/json", &controllers.DockerapiController{}, "get:GetContainers")
	beego.Router("/dockerapi/containers/:id/json", &controllers.DockerapiController{}, "get:GetContainer")
	beego.Router("/dockerapi/images/json", &controllers.DockerapiController{}, "get:GetImages")
	beego.Router("/dockerapi/images/:id/json", &controllers.DockerapiController{}, "get:GetImage")
	beego.Router("/dockerapi/images/:user/:repo/json", &controllers.DockerapiController{}, "get:GetUserImage")
}
