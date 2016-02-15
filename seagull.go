package main

import (
	"github.com/astaxie/beego"
	_ "github.com/tobegit3hub/seagull/routers"
	"path/filepath"
	"runtime"
)

func init() {
	_, file, _, _ := runtime.Caller(1)
	apppath, _ := filepath.Abs(filepath.Dir(filepath.Join(file, string(filepath.Separator))))
	if err := beego.BuildTemplate(apppath+string(filepath.Separator)+"views", "index.html"); err != nil {
		panic(err)
	}
}

/* The main function of beego application */
func main() {
	// Build the binary to run web server
	beego.Run()
}
