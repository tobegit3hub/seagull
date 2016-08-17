FROM golang:1.6-alpine
MAINTAINER tobe tobeg3oogle@gmail.com

# Install dependency
RUN apk add -U git\
    && go get github.com/astaxie/beego \
    && apk del git \
    && rm -rf /var/cache/apk/* /tmp/*

# Build seagull
Add . /go/src/github.com/tobegit3hub/seagull/
WORKDIR /go/src/github.com/tobegit3hub/seagull/
RUN go build seagull.go

# Expose the port
EXPOSE 10086

# Run the server
CMD ["./seagull"]
