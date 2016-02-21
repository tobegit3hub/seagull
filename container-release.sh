#!/usr/bin/env bash

set -x

CONTAINER_NAME=${1}
CONTAINER_TAG=${2}

PROJECT_DIR="${PWD}"

${PROJECT_DIR}/container-make.sh "${CONTAINER_NAME}" "${CONTAINER_TAG}"

# TODO docker tag command should go here

# TODO docker push command should go here
