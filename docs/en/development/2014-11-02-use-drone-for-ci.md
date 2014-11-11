
# Use Drone For CI

Drone is a hosted continuous integration service. Seagull uses it for continuous tests.

## Official Tutorial

If you're new to drone, please go to <http://docs.drone.io/>.

Here's a more detailed document for go project, <http://docs.drone.io/golang.html>.

## How Seagull Uses It

Here're all the commands about how we use drone.

<pre>
go get github.com/astaxie/beego
go get github.com/beego/bee
go build seagull.go
go test ./tests
</pre>

And it works. Drone.io will do continuous tests for seagull automatically.
