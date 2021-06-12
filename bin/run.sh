#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail
set -o xtrace

readonly SCRIPT_DIR="$(cd "$(dirname "$0")"; pwd)"
readonly PROJECT_HOME="${SCRIPT_DIR}/.."

cd "${PROJECT_HOME}"
rm -rf dist
yarn tsc
sudo node dist/webSocketCarApplication.js
