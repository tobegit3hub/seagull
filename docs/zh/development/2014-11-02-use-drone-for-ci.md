
# 使用Drone做持续集成

Drone.io是一个持续集成的托管服务。海鸥使用它来做持续测试。

## 官方教程

如果你没有接触过，请到它的官网<http://docs.drone.io/>。

这里有一份针对Go项目更详细的文档，<http://docs.drone.io/golang.html>。

## 海鸥如何使用它

这是是我们使用Drone的所有命令。

<pre>
go get github.com/astaxie/beego
go get github.com/beego/bee
go build seagull.go
go test ./tests
</pre>

这已经足够了，Drone.io会自动为海鸥项目做持续测试。
