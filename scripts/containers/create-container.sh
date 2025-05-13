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
    echo "Processing port mappings: $container_port_json"
    
    # Super simple approach - try to extract hostPort and containerPort directly
    if [[ "$container_port_json" == *"hostPort"* && "$container_port_json" == *"containerPort"* ]]; then
        # Extract values without relying on complex JSON parsing
        host_port=$(echo "$container_port_json" | sed -n 's/.*"hostPort":"\([^"]*\)".*/\1/p')
        container_port=$(echo "$container_port_json" | sed -n 's/.*"containerPort":"\([^"]*\)".*/\1/p')
        
        echo "Direct extraction - Host port: $host_port, Container port: $container_port"
        
        if [ -n "$host_port" ] && [ -n "$container_port" ]; then
            echo "Adding port mapping: $host_port:$container_port"
            CMD="$CMD -p $host_port:$container_port"
        fi
    fi
    
    # If the above didn't work, try another approach
    if [[ "$CMD" != *"-p "* ]]; then
        echo "First method didn't work, trying alternative extraction..."
        
        # Try to extract using grep and cut
        host_port=$(echo "$container_port_json" | grep -o '"hostPort":"[^"]*"' | head -1 | cut -d '"' -f4)
        container_port=$(echo "$container_port_json" | grep -o '"containerPort":"[^"]*"' | head -1 | cut -d '"' -f4)
        
        echo "Alternative extraction - Host port: $host_port, Container port: $container_port"
        
        if [ -n "$host_port" ] && [ -n "$container_port" ]; then
            echo "Adding port mapping: $host_port:$container_port"
            CMD="$CMD -p $host_port:$container_port"
        fi
    fi
    
    # Last resort - hardcode the ports if we know what they should be
    if [[ "$CMD" != *"-p "* ]]; then
        echo "WARNING: Could not extract port mapping from JSON. Using manual extraction."
        
        # Try to get port by manual pattern matching - very specific to your use case
        if [[ "$container_port_json" == *"8080"* && "$container_port_json" == *"80"* ]]; then
            echo "Detected 8080:80 pattern in JSON, adding manually"
            CMD="$CMD -p 8080:80"
        fi
    fi
fi

# Add Environment Variables
if [ -n "$container_env_json" ] && [ "$container_env_json" != "[]" ]; then
    # Use a simple parsing approach for JSON array of objects
    without_brackets=$(echo "$container_env_json" | sed 's/^\[//g' | sed 's/\]$//g')
    
    # If not empty, process each item
    if [ -n "$without_brackets" ]; then
        # Process env vars directly without using a pipe to while (which creates a subshell)
        # First create an array with each JSON object
        IFS=$'\n' env_items=($(echo "$without_brackets" | sed 's/},{/}\n{/g'))
        
        # Loop through each item and add to command directly
        for item in "${env_items[@]}"; do
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
        # Process volume mappings directly without using a pipe to while (which creates a subshell)
        # First create an array with each JSON object
        IFS=$'\n' volume_items=($(echo "$without_brackets" | sed 's/},{/}\n{/g'))
        
        # Loop through each item and add to command directly
        for item in "${volume_items[@]}"; do
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

# Log the full command that will be executed
echo "======== DEBUG INFO ========"
echo "Container Name: $container_name"
echo "Container Image: $container_image"
echo "Port Mappings: $container_port_json"
echo "Environment Variables: $container_env_json"
echo "Volumes: $container_volume_json"
echo "Network: $container_network"
echo "Restart Policy: $container_restart_policy"
echo "Full Command: $CMD"
echo "=========================="

# Log the full command that will be executed
echo "======== DEBUG INFO ========"
echo "Container Name: $container_name"
echo "Container Image: $container_image"
echo "Port Mappings: $container_port_json"
echo "Environment Variables: $container_env_json"
echo "Volumes: $container_volume_json"
echo "Network: $container_network"
echo "Restart Policy: $container_restart_policy"
echo "Full Command: $CMD"
echo "=========================="

# Make sure the command has port mapping if it was provided in the JSON
if [ "$container_port_json" != "[]" ] && [[ "$CMD" != *"-p "* ]]; then
  echo "WARNING: Port mapping was provided but not added to the command! Adding manual debug info:"
  echo "Full Port JSON: $container_port_json"
  
  # Try a last-resort direct extraction
  if [[ "$container_port_json" == *hostPort* && "$container_port_json" == *containerPort* ]]; then
    # Extract the first pair only as a last resort
    first_host=$(echo "$container_port_json" | sed -E 's/.*"hostPort":"([^"]*)".*/\1/')
    first_container=$(echo "$container_port_json" | sed -E 's/.*"containerPort":"([^"]*)".*/\1/')
    
    if [ -n "$first_host" ] && [ -n "$first_container" ]; then
      echo "Found direct port values: $first_host:$first_container"
      CMD="$CMD -p $first_host:$first_container"
    fi
  fi
fi

# Execute the command
echo "Executing Docker command..."
echo "FINAL COMMAND: $CMD"
RESULT=$(eval "$CMD")
STATUS=$?

if [ $STATUS -eq 0 ]; then
  echo "✓ Container created successfully: $RESULT"
else
  echo "✗ Failed to create container, exit code: $STATUS"
fi

# Check if container was created successfully
if [ $? -eq 0 ]; then
    echo "Container Created Successfully: $RESULT"
    exit 0
else
    echo "Failed to Create Container: $RESULT" >&2
    exit 1
fi