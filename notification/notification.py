import json
import boto3
import urllib

dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')
ses = boto3.client("ses")
table_name = 'ghcn-api'


def update_attributes(table, items, key):
    expression, values = format_items(items)
    response = table.update_item(
        Key={
            'Key': key
        },
        UpdateExpression=expression,
        ExpressionAttributeValues=values,
        ReturnValues="UPDATED_NEW"
    )
    return response


## format items
def format_items(items):
    expression = 'set '
    values = {}
    cnt = 0
    for key, value in items.items():
        tp = ':val' + str(cnt)
        cnt = cnt + 1
        expression = expression + key + '=' + tp
        values[tp] = value
    return (expression, values)


def lambda_handler(event, context):
    # TODO implement
    ## get the bucket name
    bucket = event['Records'][0]['s3']['bucket']['name']
    ## get the file name
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')

    ### get metadata
    try:
        items = s3.head_object(Bucket=bucket, Key=key)
        print(items)

    except Exception as e:
        print(e)
        raise e

    ## email notification
    subject = str(event['Records'][0]["eventName"]) + "Event from " + bucket

    ### update table
    table = dynamodb.Table(table_name)
    update_attributes(table_name, items, key)