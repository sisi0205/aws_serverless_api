from flask_lambda import FlaskLambda
from flask import request, render_template
from flask_cors import CORS
import json
import boto3
import os

app = FlaskLambda(__name__)
CORS(app)
# app = Flask(__name__)
ddb = boto3.resource('dynamodb')
s3 = boto3.resource('s3')
client = boto3.client('s3')
table = ddb.Table('ghcn-api')
source_bucket = "noaa-ghcn-pds"
target_bucket = "ghcn-api-data-archive"

# bucket_cors = s3.BucketCors('ghcn-api-s3bucket-8wp90fqi05ac')
# response = bucket_cors.put(
#     CORSConfiguration={
#         'CORSRules': [
#             {
#                 'AllowedHeaders': [
#                     'x-amz-*','X-Api-Key','Content-Type','Authorization',
#                 ],
#                 'AllowedMethods': [
#                     'GET','POST','PUT','DELETE','OPTIONS',
#                 ],
#                 'AllowedOrigins': [
#                     '*',
#                 ],
#                 'ExposeHeaders': [
#                     'x-amz-server-side-encryption','x-amz-request-id','x-amz-id-2'
#                 ],
#                 'MaxAgeSeconds': 123
#             },
#         ]
#     },
#
# )

@app.route('/')
def index():
    # copy the file
    response = client.list_objects(Bucket=source_bucket)
    file_key = response['Contents'][2]['Key']
    print(file_key)

    ### create a copy_source dictionary
    copy_source = {
        'Bucket': source_bucket,
        'Key': file_key
    }
    ### create a object
    bucket = s3.Bucket(target_bucket)
    obj = bucket.Object(file_key)
    ### copy the source to the object
    obj.copy(copy_source)

    data = {
        "message": file_key + " has been copied to "+target_bucket+"bucket"
    }
    return json_response(data)

@app.route('/table', methods= ['GET','POST'])
def post_file():
    table_results = table.scan()['Items']
    # print(request)
    return json_response(table_results)


@app.route('/put_list',methods= ['POST'])
def put_list_file():
    # table.put_item(Item=request.form.to_dict())
    print(" here is the post method")
    return json_response({"message": "entry created"})

def json_response(data, response_code = 200):
    return (json.dumps(data),
            200,
            {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            }
            )