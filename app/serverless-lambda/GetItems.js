'use strict'
const AWS = require('aws-sdk')

exports.handler = async (event) => {
    // TODO implement
    const doucumentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;


    // const  fileType  = event['fileType'];
    // console.log(fileType);

    // const params = {
    //     TableName: "archive",
    //     "ScanIndexForward": true,
    //      "FilterExpression": "#DYNOBASE_fileType = :fileType",
    //      "ExpressionAttributeNames": {
    //      "#DYNOBASE_fileType": "fileType"
    //       },
    //       "ExpressionAttributeValues": {
    //       ":fileType": fileType
    //       }
    // }
    const params = {
        TableName: "archive"
    }

    try {
        // put data into dynamoDB
        const data = await doucumentClient.scan(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 200;

    } catch(err){
        responseBody = `Unable to get product: ${err}`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body:responseBody
    };

    return response;

};
