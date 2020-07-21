#!/bin/bash

BUCKET="ghcn-api-data-archive"
aws s3 rm s3://${BUCKET}

#aws cloudformation delete-stack --stack-name myteststack
