const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const quoteService = {
    submitQuote: async (userId, quote) => {
        const params = {
            TableName: 'Quote',
            Item: {
                userId,
                quote,
            },
        };

        await dynamoDB.put(params).promise();
    },

    getRandomQuote: async () => {
        const params = {
            TableName: 'Quote',
        };

        const result = await dynamoDB.scan(params).promise();

        if (result.Items.length === 0) {
            throw new Error('No quotes found in DynamoDB');
        }

        const randomIndex = Math.floor(Math.random() * result.Items.length);
        return result.Items[randomIndex].quote;
    },
};

module.exports = quoteService;