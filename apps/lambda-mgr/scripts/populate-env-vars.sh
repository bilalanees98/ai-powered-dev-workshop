#!/bin/bash

echo "Warning: Make sure there are no commented or blank lines in the .env file. Also make sure the there is an empty line after the last env var"

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: ./populate-env-vars.sh <env_file> <func_name>"
    exit 1
fi
ENV_FILE="$1"
FUNC_NAME="$2"

# Function to convert .env to JSON
env_to_json() {
    local json="{\"Variables\":{"
    while IFS='=' read -r key value; do
        # Ignore comments and empty lines
        if [[ $key == \#* ]] || [[ -z $key ]]; then
            continue
        fi
        # Trim leading and trailing whitespace and newlines
        key=$(echo -n "$key" | xargs)
        value=$(echo -n "$value" | xargs)
        # Ensure value does not contain newlines
        value=$(echo "$value" | tr -d '\n' | tr -d '\r')
        # Escape double quotes in values
        value=$(echo "$value" | sed 's/"/\\"/g')
        json+="\"${key}\":\"${value}\","
        count+=1
    done < "$ENV_FILE"
    json="${json%,}}"  # Remove the trailing comma and close the JSON
    json+="}"
    echo "$json"
}

env_json=$(env_to_json)
echo "Converted env to json"

read -p "Enter your AWS profile you want to use: " AWS_PROFILE

# Update the Lambda function configuration
aws lambda --profile "$AWS_PROFILE" --region us-east-1 update-function-configuration --function-name $FUNC_NAME --environment "$env_json"

## IMP: in case of errors first check whether the json is being created correctly or not: https://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-configuration.html
