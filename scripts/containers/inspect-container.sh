#!/bin/bash

# This script is used to inspect a container.
container="$1"
inspect=$(docker inspect "$container" 2>&1)
if [ -n "$inspect" ]; then
  echo "$inspect"
else
  echo "No information found for container $container."
fi