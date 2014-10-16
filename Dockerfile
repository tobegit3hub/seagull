FROM golang
MAINTAINER tobe tobeg3oogle@gmail.com

# ENV GOPATH /go

RUN go get github.com/astaxie/beego
RUN go get github.com/beego/bee

# apt-get install -y git

# ADD . /go/src/github.com/tobegit3hub/
RUN git clone https://github.com/tobegit3hub/seagull.git /go/src/github.com/tobegit3hub/seagull/

WORKDIR /go/src/github.com/tobegit3hub/seagull/

RUN go build seagull.go

EXPOSE 10086

CMD ["./seagull"]



