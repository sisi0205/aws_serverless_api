'use strict'
const AWS = require('aws-sdk')

exports.handler = async (event) => {
    // TODO implement
    const doucumentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "Products"
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
            "Content-Type": "application/json"
        },
        body:responseBody
    };

    return response;

};
