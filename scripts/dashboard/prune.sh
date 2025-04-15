#!/bin/bash

# This script is used to prune all stopped containers, dangling images, and unused networks.
docker system prune -f
docker volume prune -f
docker network prune -f
docker image prune -f
docker container prune -f
docker builder prune -f

# OUTPUT
# Deleted Containers:
# 29bed43c408e695c6e1d2f692c32959a6d89501d10523028673d629544a224e8
# de4480134472a267a9f32e47ec1d84b0db3825fa77972c77fde1bdad516ea248
# 2133bd9fd04e74340e6f2f3169e82d81135a3bdc918442ca051735afbf0ed4c4
# 
# Deleted build cache objects:
# th7jjuz0amoha5njx8a5lptxf
# j5a8nxxrr5lstevvwv45sgvzt
# 
# Total reclaimed space: 140B
# Deleted Volumes:
# 1706933270faf3d59639cb6ab2b2be746e781b1554cd00114f704a93c90b5fe6
# 6ed20e295d6e6843299acfa5c5fa1bf98e84068c9df3ac8ca75617b40ef89ffa
# 
# Total reclaimed space: 0B
# Total reclaimed space: 0B
# Total reclaimed space: 0B
# Total: 0B

