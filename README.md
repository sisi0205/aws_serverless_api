## Add inline policy to lambda function
```yaml
getDataFunction:
    Type: AWS::Serverless::Function # More info about Function Resource: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#awsserverlessfunction
    Properties:
      CodeUri: ./src/
      Handler: app.app
      Runtime: python3.6
      Policies:
        - Statement:
            - Effect: Allow
              Action:
                - "s3:*"
              Resource: "*"
        - DynamoDBCrudPolicy:
            TableName:
              !Ref ghcnTable
        - S3FullAccessPolicy:
            BucketName:
              !Ref NotificationBucket

```