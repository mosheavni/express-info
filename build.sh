#!/bin/bash
if [[ -n $1 ]]; then
  new_version=$1
else
  new_version=$(jq -r '.version | split(".") | first | tonumber + 1' package.json)
fi
jq '.version="'$new_version'.0.0"' package.json >package.json.new
REPO=mosheavni/express
docker build -t ${REPO}:${new_version} .
docker tag ${REPO}:${new_version} ${REPO}:latest
docker push ${REPO}:${new_version}
docker push ${REPO}:latest

rm -f package.json
mv package.json.new package.json
