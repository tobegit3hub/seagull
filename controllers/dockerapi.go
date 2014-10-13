package controllers

/*
 * Docker API from https://docs.docker.com/reference/api/docker_remote_api_v1.14/
 * Acess Unix Socket from https://github.com/Soulou/curl-unix-socket
 */

import (
	"github.com/astaxie/beego"

	"fmt"
	//"encoding/json"
	"io/ioutil"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"strings"
)

func RequestUnixSocket(u string) string {

	return "hello"
}

type DockerapiController struct {
	beego.Controller
}

func (this *DockerapiController) GetContainers() {

	u := "unix:///var/run/docker.sock:/images/json"
	result := RequestUnixSocket(u)

	fmt.Println(result)
	this.Data["json"] = result
	this.ServeJson()
}

func (this *DockerapiController) GetContainer() {

}

func (this *DockerapiController) GetImages() {

	url_string := "unix:///var/run/docker.sock:/images/json"
	u, err := url.Parse(url_string)
	if err != nil || u.Scheme != "unix" {
		return
	}

	hostAndPath := strings.Split(u.Path, ":")
	u.Host = hostAndPath[0]
	u.Path = hostAndPath[1]

	conn, err := net.Dial("unix", u.Host)
	if err != nil {
		fmt.Println("Fail to connect to", u.Host, ":", err)
		return
	}

	reader := strings.NewReader("")

	query := ""
	if len(u.RawQuery) > 0 {
		query = "?" + u.RawQuery
	}

	req, err := http.NewRequest("GET", u.Path+query, reader)
	if err != nil {
		fmt.Println("Fail to create http request", err)
		return
	}

	client := httputil.NewClientConn(conn, nil)

	//res, err := requestExecute(conn, client, req)
	res, err := client.Do(req)

	if err != nil {
		fmt.Println("Fail to achieve http request over unix socket", err)
		os.Exit(1)
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println("Invalid body in answer")
		os.Exit(1)
	}

	defer res.Body.Close()

	this.Ctx.WriteString(string(body))

}

func (this *DockerapiController) GetImage() {

}
