
# Base image golang is in https://registry.hub.docker.com/_/golang/
# Refer to https://blog.golang.org/docker for usage

FROM golang
MAINTAINER tobe tobeg3oogle@gmail.com

# ENV GOPATH /go

# Install dependency
RUN go get github.com/astaxie/beego
RUN go get github.com/beego/bee

# apt-get install -y git

# ADD . /go/src/github.com/tobegit3hub/
RUN git clone https://github.com/tobegit3hub/seagull.git /go/src/github.com/tobegit3hub/seagull/

# Go to the folder of seagull
WORKDIR /go/src/github.com/tobegit3hub/seagull/

# Build the project
RUN go build seagull.go

# Default port, should be the same as httpport in conf/app.conf
EXPOSE 10086

# Run the HTTP server
CMD ["./seagull"]



