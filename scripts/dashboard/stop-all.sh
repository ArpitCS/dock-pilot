#!/bin/bash

# This script is used to start all running containers.
containers=$(docker ps -aq -f "status=running")
if [ -n "$containers" ]; then
  docker stop $containers
else
  echo "No running containers to stop."
fi

# OUTPUT
# 29bed43c408e695c6e1d2f692c32959a6d89501d10523028673d629544a224e8
# de4480134472a267a9f32e47ec1d84b0db3825fa77972c77fde1bdad516ea248
# 2133bd9fd04e74340e6f2f3169e82d81135a3bdc918442ca051735afbf0ed4c4