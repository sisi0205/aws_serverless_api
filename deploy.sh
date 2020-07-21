#!/bin/bash

BUCKET=$ghcn-api-s3bucket-8wp90fqi05ac
aws s3 rm s3://$BUCKET

#aws cloudformation delete-stack --stack-name myteststack
