'use strict'
const AWS = require('aws-sdk')

exports.handler = async (event) => {
    // TODO implement
    const doucumentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "Products",
        Key: {
            id: '12345',
        }
    }

    try {
        // put data into dynamoDB
        const data = await doucumentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;

    } catch(err){
        responseBody = `Unable to delete product: ${err}`;
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
