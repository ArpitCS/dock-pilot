#!/bin/bash

# This script is used to display system resources.
# Get CPU usage
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2 + $4}')

# Get Memory usage
MEMORY_TOTAL=$(free -m | awk '/^Mem:/ {print $2}')
MEMORY_USED=$(free -m | awk '/^Mem:/ {print $3}')
MEMORY_USAGE=$(awk "BEGIN {printf \"%.2f\", ($MEMORY_USED/$MEMORY_TOTAL)*100}")

# Get Disk usage
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}')

# Display the information
echo "CPU Usage: $CPU_USAGE%"
echo "Memory Usage: $MEMORY_USAGE% ($MEMORY_USED MB / $MEMORY_TOTAL MB)"
echo "Disk Usage: $DISK_USAGE"

# OUTPUT
# CPU Usage: 2.5%
# Memory Usage: 45.67% (2048 MB / 4096 MB)
# Disk Usage: 20%