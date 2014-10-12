package routers

import (
	"github.com/tobegit3hub/seagull/controllers"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.MainController{})
		beego.Router("/:page", &controllers.MainController{})
}
