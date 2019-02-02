#!/bin/bash

# This script will start a single "disposable" instance and connect you to it via bash.
# The instance will link to all infrastructure
# It's disposable, so exit bash and the containers are removed
IMAGE_NAME="dezignspiration_frontend"

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT="$(dirname "${SCRIPT_DIR}")"

echo " ----- Starting Up Infrastructure Containers -----"
 docker-compose -p dezignspirationfe up -d

# Start our disposable container and link in needed containers.
echo " ----- Starting Disposable Docker Containers -----"
echo " ----- Using .env File from [${ROOT}] -----"

docker run \
    -i \
    -t \
    -p 44400:44400 \
    -v ${ROOT}:/src \
    --env-file=${ROOT}/.env \
    --network=dezignspiration_main_network \
    ${IMAGE_NAME} \
    sh -c "npm install && bash"

# When bash is exited, remove the container
echo " ----- EXITED from disposable container -----"
echo " ----- Removing Containers -----"

# No point leaving our services running after exiting the container
docker ps -a | grep ${IMAGE_NAME} | grep -v mysql | grep -v test | awk '{print $1 }' | xargs -I {} docker rm -f {}
