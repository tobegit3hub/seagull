
# Access Docker Remote API

Docker remote API is the interface to access data from docker daemon.

## Official Tutorial

Here's the official website of docker document, <https://docs.docker.com/reference/api/docker_remote_api/>.

You may know about the detail of docker remote API. But how to use it? Actually there're two ways which are unix socket and HTTP port.

## Unix Socket Remote API

By default the Docker daemon listens on the unix socket of unix:///var/run/docker.sock.

I'm not familiar with unix socket but it's kind of like the pipe for communication. You can access it and get the data of docker from this file.

But we need to write the program to access it. Fortunately, we have found curl-unix-socket in <https://github.com/Soulou/curl-unix-socket>. You can simply install it with `go get github.com/Soulou/curl-unix-socket` and just run `curl-unix-socket unix:///var/run/docker.sock:/images/json` for test.

It's really useful and you can get all information to monitor your docker daemon. But it's a command-line tool and works like the official docker client.

So seagull has used its code to get data from docker daemon. It's the easiest way to do that without extra operations.

## HTTP Remote API

You can use docker HTTP remote API as well. But you have to expose the port manually.

Firstly you need to stop the docker daemon by `service docker stop`. Then restart it with the parameters like `docker -d -H unix:///var/run/docker.sock -H 0.0.0.0:4243 &`. Now you can test it in your browser or just `curl -X GET http://127.0.0.1:4243`.

HTTP remote API is useful but it requires users to restart the docker daemon.

## Docker Client

If you're not developing a tool like seagull, I think the docker client is good enough. You can do anything with docker client and it's officially supported.
