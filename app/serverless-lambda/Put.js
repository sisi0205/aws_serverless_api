
'use strict'
const AWS = require('aws-sdk')

exports.handler = async (event) => {
    // TODO implement
    const doucumentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;

    const { fileName, filePath } = JSON.parse(event.body);

    const params = {
        TableName: "archive",
        Item: {
            fileName: fileName,
            filePath: filePath
        }
    }

    try {
        // put data into dynamoDB
        const data = await doucumentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;

    } catch(err){
        responseBody = `Unable to put product: ${err}`;
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
