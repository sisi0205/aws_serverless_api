#!/bin/bash

BUCKET="ghcn-api-data-archive"
aws s3 rm s3://${BUCKET}
sam build
sam deploy

#aws cloudformation delete-stack --stack-name myteststack
