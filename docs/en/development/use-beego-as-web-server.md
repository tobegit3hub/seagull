
# Use Beego As Web Server

If you're new to Beego, welcome to a better world with Beego. It's one of the best web frameworks and has complete document in Chinese(Well it's not important).

Now we will introduce how to use Beego as a web server.

## Official Tutorial

Please refer to the official website of Beego, <http://beego.me/>.

You may know more about the basic of Beego.

## How To Use It

Beego is written in go. If you want to use it for your project, you have to setup GOPATH first.

There's a tool named bee which helps to build a Beego website. You can install it by `go get github.com/beego/bee`.

Now you need to run `go get github.com/astaxie/beego` to download Beego in your GOPATH.

The most simple source file of web server looks like the following server.go.

```
package main

import "github.com/astaxie/beego"

func main() {
    beego.Run()
}
```

Then you can `go build server.go` and `./server` to start a web server.

Is that quite simple? Yes, but we will not use Beego in this way because it lacks of routers or controllers.

## How Seagull Use It

The recommanded way to build Beego server is using `bee`.

### Bee New Project

If you have `go get github.com/beego/bee`, just run `bee new seagull`. It will generate many files and you just need to add your code.

The tree of generated files should look like this.

<pre>
seagull
├── conf
│   └── app.conf
├── controllers
│   └── default.go
├── main.go
├── models
├── routers
│   └── router.go
├── static
│   ├── css
│   ├── img
│   └── js
├── tests
│   └── default_test.go
└── views
    └── index.tpl
</pre>

Okay, now let's run `bee run seagull`. You can go to <http://127.0.0.1:8080> in your bowser to see the default page of Beego.

### App Conf

Let's go with app.conf in directory conf.

```
appname = seagull
httpport = 8080
runmode = dev
```

All you have to is changing the name of app or the port of http. You can set runmode as "pro" when you want to run in production environment.

### Router

You can add your own routers in router.go.

```
package routers

import (
        "github.com/seagull/controllers"
        "github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.MainController{})
}
```

Here's the default controller named MainController in controllers package. Add your controllers if you need.

But actually seagull is a single page application and we just need one default back-end controller.

There's the source code of seagull in seagull/routers/router.go.

```
beego.Router("/", &controllers.MainController{})
beego.Router("/containers", &controllers.MainController{})
beego.Router("/containers/:id", &controllers.MainController{})
beego.Router("/images", &controllers.MainController{})
beego.Router("/images/:id", &controllers.MainController{})
beego.Router("/images/:user/:repo", &controllers.MainController{})
beego.Router("/configuration", &controllers.MainController{})
```

### Controllers

Let's dive into the source code of default.go which is in directory controllers.

```
package controllers

import (
        "github.com/astaxie/beego"
)

type MainController struct {
        beego.Controller
}

func (this *MainController) Get() {
        this.Data["Website"] = "beego.me"
        this.Data["Email"] = "astaxie@gmail.com"
        this.TplNames = "index.tpl"
}
```

It uses the template index.tpl to display the default page of Beego.

We change a little for seagull.

```
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
```

Now we use another template file, which is a simply HTML file.

### Views

If you're interested, I will show you the source code of index.tpl.

```
 <!DOCTYPE html>
 <html>
   <head>
     <title>Beego</title>
     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
   </head>
     <body>
       <header class="hero-unit" style="background-color:#A9F16C">
       <div class="container">
       <div class="row">
         <div class="hero-text">
           <h1>Welcome to Beego!</h1>
           <p class="description">
             Beego is a simple & powerful Go web framework which is inspired by tornado and sinatra.
           <br />
             Official website: <a href="http://{{.Website}}">{{.Website}}</a>
           <br />
             Contact me: {{.Email}}
           </p>
         </div>
       </div>
       </div>
     </header>
   </body>
 </html>
```

It's so simple and you can build your web server with Beego like this.
