FROM golang:1.4
MAINTAINER tobe tobeg3oogle@gmail.com

# Install dependency
RUN go get github.com/astaxie/beego
RUN go get github.com/beego/bee

# Build seagull
RUN go get github.com/tobegit3hub/seagull
WORKDIR /go/src/github.com/tobegit3hub/seagull/
RUN go build seagull.go

# Expose the port
EXPOSE 10086

# Run the server
CMD ["./seagull"]
