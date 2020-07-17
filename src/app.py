from flask_lambda import FlaskLambda
from flask import request, render_template
import json
import boto3
import os
app = FlaskLambda(__name__)
# app = Flask(__name__)
ddb = boto3.resource('dynamodb')
table = ddb.Table('ghcn-api')
# table = ddb.Table(os.environ['MyTableName'])

@app.route('/')
def index():
    # return render_template('home.html')
    data = {
        "message": "Hello world"
    }
    return (
        json.dumps(data),
        200,
       {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },


    )

@app.route('/table', methods= ['GET'])
def post_file():
    table_results = table.scan()['Items']
    return json_response(table_results)



@app.route('/put_list',methods= ['POST'])
def put_list_file():
    table.put_item(Item=request.form.to_dict())
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