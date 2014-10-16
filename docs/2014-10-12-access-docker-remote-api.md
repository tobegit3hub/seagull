
## Access with unix sock

1. Refer to <https://github.com/Soulou/curl-unix-socket>
2. Install the tool by `go get github.com/Soulou/curl-unix-socket`
3. Test by `./curl-unix-socket unix:///var/run/docker.sock:/v1.6/images/json`

## Setup HTTP remote API

1. Stop docker deamon by `service docker stop`
2. Start docker deamon by `docker -d -H unix:///var/run/docker.sock -H 0.0.0.0:4243 &`
3. Test by `curl -X GET http://127.0.0.1:4243`


## Reference

* <https://docs.docker.com/reference/api/docker_remote_api_v1.14/>

