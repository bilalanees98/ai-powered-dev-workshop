#!/bin/bash

# Check if IMAGE_TAG is passed
if [ -z "$1" ]; then
  echo "Usage: $0 <IMAGE_TAG> or if calling thorugh an npm script: IMAGE_TAG=<tag-name> npm run deploy:image:<env>"
  exit 1
fi

IMAGE_TAG=$1
echo $1

# Replace the placeholder in the template with the actual IMAGE_TAG
echo "Updating environment.config with IMAGE_TAG=$IMAGE_TAG..."
sed "s/__IMAGE_TAG__/$IMAGE_TAG/" .ebextensions/environment.config.template > .ebextensions/environment.config

echo "environment.config updated successfully."
