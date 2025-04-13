#!/bin/bash

# This script is used to start a container.
container="$1"
docker start "$container" 2>&1
if [ $? -eq 0 ]; then
  echo "Container $container started successfully."
else
  echo "Failed to start container $container."
fi