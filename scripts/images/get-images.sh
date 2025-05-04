#!/bin/bash

# Get all Docker images
echo "Images loaded:"
docker images --format "{{.Repository}}  {{.Tag}}  {{.ID}}  {{.Size}}  {{.CreatedSince}}"