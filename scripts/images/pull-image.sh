#!/bin/bash

# pull-image.sh - Script to pull Docker images

# Check if image name was provided
if [ $# -lt 1 ]; then
  echo "Usage: $0 <image-name>"
  exit 1
fi

IMAGE_NAME="$1"
echo "Pulling image: $IMAGE_NAME"

# Pull the Docker image
if docker pull "$IMAGE_NAME"; then
  echo "Successfully pulled image: $IMAGE_NAME"
  exit 0
else
  echo "Failed to pull image: $IMAGE_NAME"
  exit 1
fi