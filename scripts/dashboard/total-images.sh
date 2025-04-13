#!/bin/bash

# This script is used to count the total number of images.
docker images -q | wc -l

# OUTPUT
# 0