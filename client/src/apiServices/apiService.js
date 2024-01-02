const url = 'https://lieyfy7dcj.execute-api.us-east-1.amazonaws.com/dev/'


async function submitQuote({ input }) {
    try {
      
        const data = await fetch(`${url}submitQuote/post`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ input })
        });
        const response = await data.json();
        console.log('i am here: ', response)
        return response
    } catch (e) {

        console.log(e);
    }
}

module.exports = { submitQuote }