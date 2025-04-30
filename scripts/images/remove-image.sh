#!/bin/bash

# Remove a Docker image
IMAGE_ID=$1

if [ -z "$IMAGE_ID" ]; then
  echo "Error: Image ID required."
  exit 1
fi

echo "Removing image: $IMAGE_ID"
docker rmi $IMAGE_ID