#!/bin/bash

set -e

cd .docker
docker-compose pull
docker-compose up -d
while ! echo exit | curl $SITE; do sleep 10; done
cd ..
