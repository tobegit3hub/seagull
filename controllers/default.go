package controllers

import (
	"github.com/astaxie/beego"
)

type MainController struct {
	beego.Controller
}

func (this *MainController) Get() {
	this.TplNames = "index.html"
	this.Render()
}

/*
type ObejctController struct {
	beego.Controller
}

func (this *ObejctController) Post() {

}

func (this *ObejctController) Get() {

}

func (this *ObejctController) Put() {

}

func (this *ObejctController) Delete() {

}
*/
