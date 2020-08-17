'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "item has been deleted";
  let statusCode = 0;

  // const { fileName, fileType } = JSON.parse(event.body);
  const fileName = event.pathParameters.filename;
  console.log(fileName);

  const params = {
    TableName: "archive",
    Key: {
      fileName: fileName
    }
  };

  try {
    const data = await documentClient.delete(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch(err) {
    responseBody = `Unable to delete product: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: responseBody
  };

  return response;
};
