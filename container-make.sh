#!/usr/bin/env bash

set -x

CONTAINER_NAME=${1}
CONTAINER_TAG=${2}

PROJECT_NAME='github.com/tobegit3hub/seagull'
PROJECT_DIR="${PWD}"
VENDOR_DIR='Godeps/_workspace'

CONTAINER_GOPATH='/go'
CONTAINER_PROJECT_DIR="${CONTAINER_GOPATH}/src/${PROJECT_NAME}"
CONTAINER_PROJECT_GOPATH="${CONTAINER_PROJECT_DIR}/${VENDOR_DIR}:${CONTAINER_GOPATH}"

docker run --rm \
        -v ${PROJECT_DIR}:${CONTAINER_PROJECT_DIR} \
        -e GOPATH=${CONTAINER_PROJECT_GOPATH} \
        -e CGO_ENABLED=0 \
        -e GODEBUG=netdns=go \
        -w "${CONTAINER_PROJECT_DIR}" \
        golang:1.5.3-alpine \
        go build -v -o seagull seagull.go

# Disable this to strip the debug information from the binary and shave off about 4Mb making the binary from 12mb to 8mb
# It means this can't be debugged by delve, gdb et al. but the side is even better
strip "${PROJECT_DIR}/seagull"

docker build -f ${PROJECT_DIR}/seagull.docker \
    -t ${CONTAINER_NAME}:${CONTAINER_TAG} \
    --build-arg BINARY_FILE=./seagull \
    "${PROJECT_DIR}"