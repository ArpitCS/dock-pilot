#!/bin/bash

# This script is used to count the number of running containers.
docker ps -q | wc -l

# OUTPUT
# 0