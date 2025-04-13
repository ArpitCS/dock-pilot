#!/bin/bash

# This script is used to get all containers.
# Format: Name ID Image Status Created Ports 

containers=$(docker ps -a --format "table {{.Names}}\t{{.ID}}\t{{.Image}}\t{{.Status}}\t{{.CreatedAt}}\t{{.Ports}}")

if [ -n "$containers" ]; then
  echo "$containers"
else
  echo "No containers found."
fi
