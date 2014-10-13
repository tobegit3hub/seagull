package controllers

/*
 * Docker API from https://docs.docker.com/reference/api/docker_remote_api_v1.14/
 * Acess Unix Socket from https://github.com/Soulou/curl-unix-socket
 */

import (
	"github.com/astaxie/beego"

	"fmt"
	"io/ioutil"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"
)

/* Request docker unix socket */
func RequestUnixSocket(address, method string) string {
	DOCKER_UNIX_SOCKET := "unix:///var/run/docker.sock"
	// Example: unix:///var/run/docker.sock:/images/json
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

	defer response.Body.Close()

	return string(body)
}

type DockerapiController struct {
	beego.Controller
}

func (this *DockerapiController) GetContainers() {
	address := "/containers/json"
	result := RequestUnixSocket(address, "GET")
	this.Ctx.WriteString(result)
}

func (this *DockerapiController) GetContainer() {
	id := this.GetString(":id")

	address := "/containers/" + id + "/json"
	result := RequestUnixSocket(address, "GET")
	this.Ctx.WriteString(result)
}

func (this *DockerapiController) GetImages() {
	address := "/images/json"
	result := RequestUnixSocket(address, "GET")
	this.Ctx.WriteString(result)
}

func (this *DockerapiController) GetImage() {

}
