#!/bin/bash

# Inspect a Docker image
IMAGE_ID=$1

if [ -z "$IMAGE_ID" ]; then
  echo "Error: Image ID required."
  exit 1
fi

docker inspect $IMAGE_ID