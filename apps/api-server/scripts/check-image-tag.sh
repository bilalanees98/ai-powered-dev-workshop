#!/bin/bash

# Check if IMAGE_TAG is set
if [ -z "$IMAGE_TAG" ]; then
  echo "Error: IMAGE_TAG is not set. Usage: IMAGE_TAG=<tag-name> npm run <any-script>"
  exit 1
fi

# Run the command passed to the script
"$@"
