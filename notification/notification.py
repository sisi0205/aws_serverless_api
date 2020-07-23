import json
import boto3
import urllib

dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')
ses = boto3.client("ses")
table_name = 'ghcn-api'


### update item
def update_attributes(table_name, items, key):
    expression, values = format_items(items)
    table = dynamodb.Table(table_name)
    print(expression)
    print(values)
    response = table.update_item(
        Key={
            'Key': key
        },
        UpdateExpression=expression,
        ExpressionAttributeValues=values,
        # ReturnValues="UPDATED_NEW"
    )
    return response


#### put item
def put_item(table_name, items):
    table = dynamodb.Table('ghcn')
    table.put_item(
        Item=items
    )


## format items
def format_items(items):
    expression = 'set '
    values = {}
    cnt = 0
    for key, value in items.items():
        tp = ':val' + str(cnt)
        cnt = cnt + 1
        if cnt > 3:
            break
        expression = expression + key + '=' + tp + ', '
        values[tp] = value
        print(key)
    expression = expression[:-2]
    print(expression)
    return (expression, values)


### check item exist
def exists(table_name, key):
    table = dynamodb.Table(table_name)
    try:
        item = table.get_item(Key={
            'Key': key
        })
    except boto3.dynamodb.exceptions.DynamoDBKeyNotFoundError:
        item = None
    return item


def lambda_handler(event, context):
    # TODO implement
    ## get the bucket name
    bucket = event['Records'][0]['s3']['bucket']['name']
    ## get the file name
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')

    ### get metadata
    response = s3.head_object(Bucket=bucket, Key=key)
    print(response)

    ### update table
    items = response['ResponseMetadata']

    response = exists(table_name, key)
    if response == None:
        put_item(items)
    else:
        update_attributes(table_name, items, key)

    ## email notification
    subject = str(event['Records'][0]["eventName"]) + "Event from " + bucket
    email = "lwang66@ncsu.edu"
    body = """
        <br>
        This email is to notify you regarding {} event
        Source IP: {}
    """
    message = {"Subject": {"Data": subject}, "Body": {"Html": {"Data": body}}}
    response = ses.send_email(Source=email, Destination={"ToAddresses": [email]}, Message=message)





