#!/bin/bash

# This script is used to delete a container.
container="$1"

docker rm "$container" 2>&1
if [ $? -eq 0 ]; then
  echo "Container $container deleted successfully."
else
  echo "Failed to delete container $container."
fi
