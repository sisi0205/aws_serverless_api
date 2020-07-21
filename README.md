# S3 bucket notification to Lambda in CloudFormation without circular reference
The steps are supposed to be:
* Create S3 bucket (AWS::S3::Bucket)
* Create Lambda (AWS::Lambda:Function)
* Allow S3 to invoke Lambda (AWS::Lambda::Permission)
* Allow Lambda to read from S3 (AWS::IAM:Role)
* Subscribe Lambda to S3 bucket notification

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Example Stack

Parameters:
  NotificationBucket:
    Type: String
    Description: S3 bucket that's used for the Lambda event notification
    Default: ghcn-api-data-archive

DataArchiveS3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Ref NotificationBucket
      NotificationConfiguration:
        LambdaConfigurations:
          - Event: 's3:ObjectCreated:*'
            Function: !GetAtt getDataFunction.Arn

  S3InvokeLambdaPermission:
    Type: AWS::Lambda::Permission
    Properties:
      Action: lambda:InvokeFunction
      FunctionName: !Ref getDataFunction
      Principal: s3.amazonaws.com
      SourceArn: !Sub arn:aws:s3:::${NotificationBucket}

  LambdaRole:
    Type: AWS::IAM::Role
    Properties:
      Description: 'S3 notification and DB access'
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action:
              - sts:AssumeRole
      Path: '/'
      Policies:
        - PolicyName: Cloudwatch
          PolicyDocument:
            Statement:
              - Effect: Allow
                Action:
                  - 'logs:CreateLogGroup'
                  - 'logs:CreateLogStream'
                  - 'logs:PutLogEvents'
                Resource: 'arn:aws:logs:*:*:*'
        - PolicyName: SESFullAcess
          PolicyDocument:
            Statement:
              - Effect: Allow
                Action:
                  - "ses:*"
                Resource: "*"
        - PolicyName: dynamoDB_access
          PolicyDocument:
            Statement:
              - Effect: Allow
                Action:
                  - dynamodb:List*
                  - dynamodb:DescribeReservedCapacity*
                  - dynamodb:DescribeLimits
                  - dynamodb:DescribeTimeToLive
                Resource: "*"
              - Effect: Allow
                Action:
                  - dynamodb:BatchGet*
                  - dynamodb:DescribeStream
                  - dynamodb:DescribeTable
                  - dynamodb:Get*
                  - dynamodb:Query
                  - dynamodb:Scan
                  - dynamodb:BatchWrite*
                  - dynamodb:CreateTable
                  - dynamodb:Delete*
                  - dynamodb:Update*
                  - dynamodb:PutItem
                Resource:
                  - !Sub arn:aws:dynamodb:*:*:table/${TableName}
        - PolicyName: s3
          PolicyDocument:
            Statement:
              - Effect: Allow
                Action:
                  - s3:Get*
                Resource:
                  - !Sub arn:aws:s3:::${NotificationBucket}
                  - !Sub arn:aws:s3:::${NotificationBucket}/*
```