#!/bin/bash

# This script is used to restart all containers
containers=$(docker ps -aq)
if [ -n "$containers" ]; then
  docker restart $containers
  echo "Restarting containers: $containers"
else
  echo "No containers to restart."
fi