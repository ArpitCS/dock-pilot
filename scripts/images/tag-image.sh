#!/bin/bash

# Tag a Docker image
IMAGE_ID=$1
NEW_TAG=$2

if [ -z "$IMAGE_ID" ] || [ -z "$NEW_TAG" ]; then
  echo "Error: Both image ID and new tag are required."
  exit 1
fi

echo "Tagging image $IMAGE_ID with tag $NEW_TAG"
docker tag $IMAGE_ID $NEW_TAG