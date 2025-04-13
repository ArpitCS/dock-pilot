#!/bin/bash

# This script is used to stop a container.
container="$1"
docker stop "$container" 2>&1
if [ $? -eq 0 ]; then
  echo "Container $container stopped successfully."
else
  echo "Failed to stop container $container."
fi