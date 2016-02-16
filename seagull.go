package main

import (
	"github.com/astaxie/beego"
	_ "github.com/tobegit3hub/seagull/routers"
)

/* The main function of beego application */
func main() {
	// Build the binary to run web server
	beego.Run()
}
