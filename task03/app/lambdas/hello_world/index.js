exports.handler = async (event) => {
    // The Lambda function will handle a GET request and return a response
    if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Hello from Lambda'
            })
        };
    } else {
        // Handle non-GET methods if needed
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        };
    }
};
