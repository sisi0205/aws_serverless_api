const axios = require('axios');

async function makePostRequest() {

    let res = await axios.post('https://g4kmiqqxm5.execute-api.us-east-2.amazonaws.com/dev');

    console.log(`Status code: ${res.status}`);
    console.log(`Status text: ${res.statusText}`);
    console.log(`Request method: ${res.request.method}`);
    console.log(`Path: ${res.request.path}`);

    console.log(`Date: ${res.headers.date}`);
    console.log(`Data: ${res.data}`);
}

makePostRequest();