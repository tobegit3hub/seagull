package controllers

import (
	"github.com/astaxie/beego"
)

/* The default controller just to render the index page */
type MainController struct {
	beego.Controller
}

/* Only accept the get request and return the webiste HTML file */
func (this *MainController) Get() {
	this.TplNames = "index.html"
	this.Render()
}
