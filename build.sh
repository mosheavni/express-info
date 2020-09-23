#!/bin/bash
if [[ -n $1 ]];then
  new_version=$1
else
  new_version=$(jq -r '.version | split(".") | first | tonumber + 1' package.json)
fi
jq '.version="'$new_version'.0.0"' package.json > package.json.new
docker build -t naturalintmma/express:${new_version} .
docker tag naturalintmma/express:${new_version} naturalintmma/express:latest
docker push naturalintmma/express:${new_version}
docker push naturalintmma/express:latest

rm -f package.json
mv package.json.new package.json
