#!/bin/bash

read -p "Enter your AWS profile that you want to deploy docker from (must be a profile with access to the ECR registry): " AWS_PROFILE
ECR_REPOSITORY=$1

aws ecr get-login-password --region us-east-1 --profile "$AWS_PROFILE" | docker login --username AWS --password-stdin "$ECR_REPOSITORY"
