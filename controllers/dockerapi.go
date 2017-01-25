package controllers

/*
 * The docker API controller to access docker unix socket and reponse JSON data
 *
 * Refer to https://docs.docker.com/reference/api/docker_remote_api_v1.14/ for docker remote API
 * Refer to https://github.com/Soulou/curl-unix-socket to know how to access unix docket
 */

import (
	"github.com/astaxie/beego"

	"fmt"
	"io/ioutil"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strconv"
	"strings"
)

/* Give address and method to request docker unix socket */
func RequestUnixSocket(address, method string) string {
	DOCKER_UNIX_SOCKET := "unix:///var/run/docker.sock"
	// Example: unix:///var/run/docker.sock:/images/json?since=1374067924
	unix_socket_url := DOCKER_UNIX_SOCKET + ":" + address
	u, err := url.Parse(unix_socket_url)
	if err != nil || u.Scheme != "unix" {
		fmt.Println("Error to parse unix socket url " + unix_socket_url)
		return ""
	}

	hostPath := strings.Split(u.Path, ":")
	u.Host = hostPath[0]
	u.Path = hostPath[1]

	conn, err := net.Dial("unix", u.Host)
	if err != nil {
		fmt.Println("Error to connect to", u.Host, err)
		return ""
	}

	reader := strings.NewReader("")
	query := ""
	if len(u.RawQuery) > 0 {
		query = "?" + u.RawQuery
	}

	request, err := http.NewRequest(method, u.Path+query, reader)
	if err != nil {
		fmt.Println("Error to create http request", err)
		return ""
	}

	client := httputil.NewClientConn(conn, nil)
	response, err := client.Do(request)
	if err != nil {
		fmt.Println("Error to achieve http request over unix socket", err)
		return ""
	}

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println("Error, get invalid body in answer")
		return ""
	}

	/* An example to get continual stream from events, but it's for stdout
		_, err = io.Copy(os.Stdout, res.Body)
		if err != nil && err != io.EOF {
			fmt.Println("Error, get invalid body in answer")
			return ""
	   }
	*/

	defer response.Body.Close()

	return string(body)
}

/* It's a beego controller */
type DockerapiController struct {
	beego.Controller
}

/* Wrap docker remote API to get contaienrs */
func (this *DockerapiController) GetContainers() {
	address := "/containers/json"
	var all int
	this.Ctx.Input.Bind(&all, "all")
	address = address + "?all=" + strconv.Itoa(all)
	result := RequestUnixSocket(address, "GET")
	this.Ctx.WriteString(result)
}

/* Wrap docker remote API to get data of contaienr */
func (this *DockerapiController) GetContainer() {
	id := this.GetString(":id")
	address := "/containers/" + id + "/json"
	result := RequestUnixSocket(address, "GET")
	this.Ctx.WriteString(result)
}

/* Wrap docker remote API to get container's status */
func (this *DockerapiController) TopContainer() {
	id := this.GetString(":id")
	address := "/containers/" + id + "/top"
	result := RequestUnixSocket(address, "GET")
	this.Ctx.WriteString(result)
}

/* Wrap docker remote API to start contaienrs */
func (this *DockerapiController) StartContainer() {
	id := this.GetString(":id")
	address := "/containers/" + id + "/start"
	result := RequestUnixSocket(address, "POST")
	this.Ctx.WriteString(result)
}


/* Wrap docker remote API to restart contaienrs */
func (this *DockerapiController) RestartContainer() {
	id := this.GetString(":id")
	address := "/containers/" + id + "/restart"
	result := RequestUnixSocket(address, "POST")
	this.Ctx.WriteString(result)
}

/* Wrap docker remote API to stop contaienrs */
func (this *DockerapiController) StopContainer() {
	id := this.GetString(":id")
	address := "/containers/" + id + "/stop"
	result := RequestUnixSocket(address, "POST")
	this.Ctx.WriteString(result)
}

/* Wrap docker remote API to delete contaienrs */
func (this *DockerapiController) DeleteContainer() {
	id := this.GetString(":id")
	address := "/containers/" + id
	result := RequestUnixSocket(address, "DELETE")
	this.Ctx.WriteString(result)
}

/* Wrap docker remote API to get container stats */
func (this *DockerapiController) GetContainerStats() {
	id := this.GetString(":id")
	address := "/containers/" + id + "/stats?stream=False"
	result := RequestUnixSocket(address, "GET")
	this.Ctx.WriteString(result)
}

/* Wrap docker remote API to get images */
func (this *DockerapiController) GetImages() {
	address := "/images/json"
	result := RequestUnixSocket(address, "GET")
	this.Ctx.WriteString(result)
}

/* Wrap docker remote API to get data of image */
func (this *DockerapiController) GetImage() {
	id := this.GetString(":id")
	address := "/images/" + id + "/json"
	result := RequestUnixSocket(address, "GET")
	this.Ctx.WriteString(result)
}

/* Wrap docker remote API to get data of user image */
func (this *DockerapiController) GetUserImage() {
	user := this.GetString(":user")
	repo := this.GetString(":repo")
	address := "/images/" + user + "/" + repo + "/json"
	result := RequestUnixSocket(address, "GET")
	this.Ctx.WriteString(result)
}

/* Wrap docker remote API to delete image */
func (this *DockerapiController) DeleteImage() {
	id := this.GetString(":id")
	address := "/images/" + id
	result := RequestUnixSocket(address, "DELETE")
	this.Ctx.WriteString(result)
}

/* Wrap docker remote API to get version info */
func (this *DockerapiController) GetVersion() {
	address := "/version"
	result := RequestUnixSocket(address, "GET")
	this.Ctx.WriteString(result)
}

/* Wrap docker remote API to get docker info */
func (this *DockerapiController) GetInfo() {
	address := "/info"
	result := RequestUnixSocket(address, "GET")
	this.Ctx.WriteString(result)
}

/* Wrap docker remote API to get search images */
func (this *DockerapiController) GetSearchImages() {
	address := "/images/search"
	var term string
	this.Ctx.Input.Bind(&term, "term")
	address = address + "?term=" + term
	result := RequestUnixSocket(address, "GET")
	this.Ctx.WriteString(result)
}

/* Todo: Implement events API, the response is a stream so can't use ioutil.ReadAll() which will be blocked
func (this *DockerapiController) GetEvents() {
	address := "/events"
	var since int
	this.Ctx.Input.Bind(&since, "since")
	address = address + "?since=" + strconv.Itoa(since)
	result := RequestUnixSocket(address, "GET")
	this.Ctx.WriteString(result)
}
*/

/* Warp docker remote API to ping docker daemon */
func (this *DockerapiController) Ping() {
	address := "/_ping"
	result := RequestUnixSocket(address, "GET")
	this.Ctx.WriteString(result)
}
