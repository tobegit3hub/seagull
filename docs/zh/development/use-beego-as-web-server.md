
# 使用Beego作为Web服务器

如果你刚接触Beego，欢迎来到有了Beego后更好的世界。它是目前最好的Web框架之一，而且拥有完整的中文文档（好吧这也不重要）。

现在我们将要介绍如何使用Beego作为Web服务器。

## 官方教程

请先参考Beego的官方网站，<http://beego.me/>。

你可以知道更多关于Beego的基础知识。

## 如何使用它

Beego是用Go写的。如果你想在你的项目中使用它，你必须首先设置好Go路径。

这里有个名为Bee的工具可以帮助你建立一个Beego网站。你可以通过`go get github.com/beego/bee`来安装它。

现在你需要执行`go get github.com/astaxie/beego`吧Beego下载到你的Go路径里。

最简单的Web服务器的源代码就像下面的server.go文件那样。

```
package main

import "github.com/astaxie/beego"

func main() {
    beego.Run()
}
```

然后你可以执行`go build server.go`或者`./server`来启动一个Web服务器。

这很简单吧？是的，但我们不会这样使用Beego，因为这样就缺少了路由器和控制器。

## 海鸥如何使用它

构建Beego服务器的推荐方法是使用`bee`。

### Bee创建新项目

如果你已经执行过`go get github.com/beego/bee`，你就只需要运行`bee new seagull`。它会生成很多文件但你只需要加入你的代码就可以了。

生成文件的目录树应该像下面这样的。

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

好的，现在让我们执行`bee run seagull`。你可以在你的浏览器上输入<http://127.0.0.1:8080>并看到Beego的默认页面。

### 应用配置

让我们看看conf目录下的app.conf文件。

```
appname = seagull
httpport = 8080
runmode = dev
```

你所需要做的仅仅是改变应用的名字或者HTTP服务的端口。你可以设置运行模式为“pro”，如果你想在生产环境使用它的话。

### 路由

你可以在router.go加上你的路由。

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

这是在controllers包里名为MainController的默认控制器。你可以根据你的需要加上新的控制器。

但实际上海鸥是一个单页应用，我们只需要一个默认的后台控制器就够了。

这是海鸥seagull/routers/router.go文件的源代码。

```
beego.Router("/", &controllers.MainController{})
beego.Router("/containers", &controllers.MainController{})
beego.Router("/containers/:id", &controllers.MainController{})
beego.Router("/images", &controllers.MainController{})
beego.Router("/images/:id", &controllers.MainController{})
beego.Router("/images/:user/:repo", &controllers.MainController{})
beego.Router("/configuration", &controllers.MainController{})
```

### 控制器

让我们深入探讨在controllers目录下default.go文件的源代码吧。

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

它使用了index.tpl模板来只是Beego的默认页面。

海鸥项目中我们稍微修改了一些。

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

现在我们使用另一个模板文件，这只是一个简单的HTML文件。

### 视图

如果你感兴趣，我来给你展示index.tpl文件的源代码。

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

这一切都非常简单，你可以像这样使用Beego来构建你的Web服务器。
