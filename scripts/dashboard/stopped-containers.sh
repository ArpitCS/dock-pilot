#!/bin/bash

# This script is used to count the number of stopped containers.
docker ps -aq -f status=exited | wc -l

# OUTPUT
# 0