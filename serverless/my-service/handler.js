'use strict';

const quoteService = require('./services/quoteService')

module.exports.submitQuoteHandler = async (event, context) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  const requestBody = JSON.parse(event.body);
  const userInput = requestBody.input;

  try {

    await quoteService.submitQuote(context.awsRequestId, userInput);

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

module.exports.getRandomQuoteHandler = async () => {

  try {
    const randomQuote = await quoteService.getRandomQuote();

    console.log('End of Lambda function (Success)');
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: 'Random quote retrieved successfully!',
        quote: randomQuote,
      }),
    };
  } catch (error) {
    console.error('Error retrieving random quote from DynamoDB:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};