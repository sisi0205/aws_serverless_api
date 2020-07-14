from flask_lambda import FlaskLambda
from flask import request, render_template
import json
import boto3
app = FlaskLambda(__name__)
ddb = boto3.resource('dynamodb')
table = ddb.Table('ghcn-api')

@app.route('/')
def index():
    # return render_template('home.html')
    data = {
        "message": "Hello world"
    }

    return (
        json.dumps(data),
        200,
        {'Content-Type':"application/json"}
    )

@app.route('/table', methods= ['GET','POST'])
def put_list_file():
    if request.method == 'GET':
        file = table.scan()['Items']
        return json_response(file)
    else:
        table.put_item(Item=request.form.to_dict())
        return json_response({"message": "student entry created"})

def json_response(data, response_code = 200):
    return json.dumps(data), response_code, {'Content-Type': 'application/json'}