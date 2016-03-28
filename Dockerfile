FROM golang:1.6
MAINTAINER tobe tobeg3oogle@gmail.com

# Install dependency
RUN go get github.com/astaxie/beego

# Build seagull
Add . /go/src/github.com/tobegit3hub/seagull/
WORKDIR /go/src/github.com/tobegit3hub/seagull/
RUN go build seagull.go

# Expose the port
EXPOSE 10086

# Run the server
CMD ["./seagull"]
