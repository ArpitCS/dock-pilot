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
if [ -n "$container_restart_policy" ] && [ "$container_restart_policy" != "no" ]; then
    CMD="$CMD --restart $container_restart_policy"
fi

# Add Network
if [ -n "$container_network" ]; then
    CMD="$CMD --network $container_network"
fi

# Add Ports
if [ -n "$container_port_json" ] && [ "$container_port_json" != "[]" ]; then
    # Use a simple parsing approach for JSON array of objects
    # Remove brackets and split by },{
    without_brackets=$(echo "$container_port_json" | sed 's/^\[//g' | sed 's/\]$//g')
    
    # If not empty, process each item
    if [ -n "$without_brackets" ]; then
        # Split by },{ and process each item
        echo "$without_brackets" | sed 's/},{/}\n{/g' | while read -r item; do
            # Extract hostPort and containerPort from JSON object
            host_port=$(echo "$item" | grep -o '"hostPort":"[^"]*"' | cut -d':' -f2- | tr -d '"')
            container_port=$(echo "$item" | grep -o '"containerPort":"[^"]*"' | cut -d':' -f2- | tr -d '"')
            
            if [ -n "$host_port" ] && [ -n "$container_port" ]; then
                CMD="$CMD -p $host_port:$container_port"
            fi
        done
    fi
fi

# Add Environment Variables
if [ -n "$container_env_json" ] && [ "$container_env_json" != "[]" ]; then
    # Use a simple parsing approach for JSON array of objects
    without_brackets=$(echo "$container_env_json" | sed 's/^\[//g' | sed 's/\]$//g')
    
    # If not empty, process each item
    if [ -n "$without_brackets" ]; then
        # Split by },{ and process each item
        echo "$without_brackets" | sed 's/},{/}\n{/g' | while read -r item; do
            # Extract key and value from JSON object
            key=$(echo "$item" | grep -o '"key":"[^"]*"' | cut -d':' -f2- | tr -d '"')
            value=$(echo "$item" | grep -o '"value":"[^"]*"' | cut -d':' -f2- | tr -d '"')
            
            if [ -n "$key" ]; then
                CMD="$CMD -e $key=$value"
            fi
        done
    fi
fi

# Add Volumes
if [ -n "$container_volume_json" ] && [ "$container_volume_json" != "[]" ]; then
    # Use a simple parsing approach for JSON array of objects
    without_brackets=$(echo "$container_volume_json" | sed 's/^\[//g' | sed 's/\]$//g')
    
    # If not empty, process each item
    if [ -n "$without_brackets" ]; then
        # Split by },{ and process each item
        echo "$without_brackets" | sed 's/},{/}\n{/g' | while read -r item; do
            # Extract hostPath and containerPath from JSON object
            host_path=$(echo "$item" | grep -o '"hostPath":"[^"]*"' | cut -d':' -f2- | tr -d '"')
            container_path=$(echo "$item" | grep -o '"containerPath":"[^"]*"' | cut -d':' -f2- | tr -d '"')
            
            if [ -n "$host_path" ] && [ -n "$container_path" ]; then
                CMD="$CMD -v $host_path:$container_path"
            fi
        done
    fi
fi

# Add Image
CMD="$CMD $container_image"

# Execute the command
echo "Executing: $CMD"
RESULT=$(eval "$CMD")

# Check if container was created successfully
if [ $? -eq 0 ]; then
    echo "Container Created Successfully: $RESULT"
    exit 0
else
    echo "Failed to Create Container: $RESULT" >&2
    exit 1
fi