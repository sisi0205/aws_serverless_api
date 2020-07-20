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
  BucketName:
    Type: String
    Default: unique-bucket-name

Resources:
  Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Ref BucketName
      ...
      NotificationConfiguration:
        LambdaConfigurations:
          - Event: 's3:ObjectCreated:*'
            Filter:
              S3Key:
                Rules:
                  - Name: prefix
                    Value: test/
                  - Name: suffix
                    Value: .txt
            Function: !GetAtt Lambda.Arn
  
  Lambda:
    Type: AWS::Lambda::Function
    ...

  S3InvokeLambdaPermission:
    Type: AWS::Lambda::Permission
    Properties:
      Action: lambda:InvokeFunction
      FunctionName: !Ref Lambda
      Principal: s3.amazonaws.com
      SourceArn: !Sub arn:aws:s3:::${BucketName}

  LambdaRole:
    Type: AWS::IAM::Role
    Properties:
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
      - PolicyName: s3
        PolicyDocument:
          Statement:
          - Effect: Allow
            Action:
              - s3:Get*
            Resource:
              - !Sub arn:aws:s3:::${BucketName}
              - !Sub arn:aws:s3:::${BucketName}/*
```