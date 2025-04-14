#!/bin/bash

container_name=$1
container_image=$2
container_port_json=$3
container_env_json=$4
container_volume_json=$5
container_network=$6
container_restart_policy=$7

echo "Creating Container: "
echo "Container Name: $container_name"
echo "Container Image: $container_image"
echo "Container Network: $container_network"
echo "Container Restart Policy: $container_restart_policy"

CMD="docker run -d"

# If Container Name provided
if [ -n "$container_name" ]; then
    CMD="$CMD --name $container_name"
fi

# Add Restart Policy
if [ -n "$container_restart_policy" ]; then
    CMD="$CMD --restart $container_restart_policy"
fi

# Add Network
if [ -n "$container_network" ]; then
    CMD="$CMD --network $container_network"
fi

# Add Ports
if [ -n "$container_port_json" ]; then
    # Convert JSON to bash array
    IFS=',' read -r -a ports <<< "$container_port_json"
    for port in "${ports[@]}"; do
        CMD="$CMD -p $port"
    done
fi

# Add Environment Variables
if [ -n "$container_env_json" ]; then
    # Convert JSON to bash array
    IFS=',' read -r -a envs <<< "$container_env_json"
    for env in "${envs[@]}"; do
        CMD="$CMD -e $env"
    done
fi

# Add Volumes
if [ -n "$container_volume_json" ]; then
    # Convert JSON to bash array
    IFS=',' read -r -a volumes <<< "$container_volume_json"
    for volume in "${volumes[@]}"; do
        CMD="$CMD -v $volume"
    done
fi

# Add Image
CMD="$CMD $container_image"

# Check if Container Created
cho "Executing: $CMD"
RESULT=$(eval $CMD)
if [ $? -eq 0 ]; then
    echo "Container Created Successfully: $RESULT"
    exit 0
else
    echo "Failed to Create Container: $RESULT"
    exit 1
fi