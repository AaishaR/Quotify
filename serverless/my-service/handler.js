'use strict';

const AWS = require('aws-sdk');
// const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.submitQuote = async (event, context) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  const requestBody = JSON.parse(event.body);
  const userInput = requestBody.input;


  const params = {
    TableName: 'Quote',
    Item: {
      userId: context.awsRequestId,
      quote: userInput,

    },
  };

  try {

    await dynamoDB.put(params).promise();

    console.log('End of Lambda function (Success)');
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: 'Quote stored in DynamoDB successfully!',
        input: userInput,
      }),
    };
  } catch (error) {
    console.error('Error storing Quote in DynamoDB:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
}
