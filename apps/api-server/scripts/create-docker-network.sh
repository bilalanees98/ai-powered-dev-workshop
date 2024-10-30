#!/bin/bash

# NETWORK_NAME="backend-otel-bridge"
NETWORK_NAME="dotlocker_network"

if docker network inspect "$NETWORK_NAME" &> /dev/null; then
  echo "Docker network '$NETWORK_NAME' already exists."
else
  echo "Creating Docker network '$NETWORK_NAME'..."
  docker network create "$NETWORK_NAME"
fi
