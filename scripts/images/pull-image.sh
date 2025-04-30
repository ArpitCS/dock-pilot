#!/bin/bash

# Pull a Docker image
IMAGE_NAME=$1

if [ -z "$IMAGE_NAME" ]; then
  echo "Error: Image name required."
  exit 1
fi

echo "Pulling image: $IMAGE_NAME"
docker pull $IMAGE_NAME