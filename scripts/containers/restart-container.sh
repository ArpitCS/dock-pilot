#!/bin/bash

# This script is used to restart a container.
container="$1"
docker restart "$container" 2>&1
if [ $? -eq 0 ]; then
  echo "Container $container restarted successfully."
else
  echo "Failed to restart container $container."
fi