# Deploy your website to S3

```yaml
S3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      AccessControl: PublicRead
      WebsiteConfiguration:
        IndexDocument: index.html
        ErrorDocument: error.html
  BucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties:
      PolicyDocument:
        Statement:
          - Sid: PublicReadForGetBucketObjects
            Effect: Allow
            Principal: '*'
            Action: s3:GetObject
            Resource: !Join
              - ''
              - - 'arn:aws:s3:::'
                - !Ref S3Bucket
                - /*
      Bucket: !Ref S3Bucket
Outputs:
  WebsiteURL:
    Value: !GetAtt S3Bucket.WebsiteURL
    Description: URL for website hosted on S3
```
Then replace the last two lines of test-add two lines website/package.json:
```json
  "scripts": {
    ...
    "predeploy": "npm run build",
    "deploy": "aws s3 sync build/ s3://ghcn-api-s3bucket-8wp90fqi05ac"
  }
```
To deploy your ReactJS website to S3:

```bash
npm run deploy
```
