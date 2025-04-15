#!/bin/bash

# This script is used to get logs from all containers.
container="$1"

logs=$(docker logs "$container" 2>&1)
if [ -n "$logs" ]; then
  echo "$logs"
else
  echo "No logs found for container $container."
fi


# OUTPUT
# 2023-10-01 12:00:00 [INFO] Container started successfully.
# 2023-10-01 12:00:01 [ERROR] Failed to connect to database.
# 2023-10-01 12:00:02 [INFO] Retrying connection...
# 2023-10-01 12:00:03 [INFO] Connection established.
# 2023-10-01 12:00:04 [INFO] Container is running.