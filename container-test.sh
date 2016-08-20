#!/usr/bin/env bash

set -x

PROJECT_NAME='github.com/tobegit3hub/seagull'
PROJECT_DIR="${PWD}"
VENDOR_DIR='Godeps/_workspace'

CONTAINER_GOPATH='/go'
CONTAINER_PROJECT_DIR="${CONTAINER_GOPATH}/src/${PROJECT_NAME}"
CONTAINER_PROJECT_GOPATH="${CONTAINER_PROJECT_DIR}/${VENDOR_DIR}:${CONTAINER_GOPATH}"

docker run --rm \
    --net="host" \
    -v ${PROJECT_DIR}:${CONTAINER_PROJECT_DIR} \
    -e CI=true \
    -e GODEBUG=netdns=go \
    -e GOPATH=${CONTAINER_PROJECT_GOPATH} \
    -w "${CONTAINER_PROJECT_DIR}" \
    golang:1.5.3 \
    go test -v -race ./... 2> output.log

EXIT_CODE=$?

cat output.log

if [ ${EXIT_CODE} != 0 ]; then
    rm -f output.log
    exit ${EXIT_CODE} 
fi

# Check for race conditions as we don't have a proper exit code for them from the tool
cat output.log | grep -v 'WARNING: DATA RACE'

EXIT_CODE=$?

rm -f output.log

# If we don't find a match then we don't have a race condition
if [ ${EXIT_CODE} == 1 ]; then
    exit 0
fi

exit ${EXIT_CODE}
