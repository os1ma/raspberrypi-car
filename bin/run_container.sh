#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail
set -o xtrace

readonly SCRIPT_DIR="$(cd "$(dirname "$0")"; pwd)"
readonly PROJECT_HOME="${SCRIPT_DIR}/.."

docker run \
  -d \
  --restart always \
  --privileged \
  -p 3000:3000 \
  -v "${PROJECT_HOME}":/work \
  -w /work \
  node:10.24.0-alpine \
  node dist/index.js websocket
