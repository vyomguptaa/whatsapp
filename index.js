const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

const API_URL = 'https://conv.chatclay.com/api/5f20b9c83b820631fdb738eb/send';
const API_KEY = 'YH9kHzF5p4wk5b3zuHJ3LH';

app.post('/callback', async (req, res) => {
    console.log('Received callback:', req.body);

    // Example data you might send, customize as needed
    const dataToSend = {
        user: "653633ae6fc1766fbacf3002",
        flow: "GetStarted",
        entities: {}  // Optional
    };

    try {
        const response = await axios.post(API_URL, dataToSend, {
            headers: {
                'x-api-key': API_KEY,
                'content-type': 'application/json'
            }
        });
        const botReply = response.data.message.text;
        console.log('Chatclay Bot Response:', botReply);
        res.json({ status: 'success', botReply: botReply });
        console.log('API Response:', response.data);
        res.json({ status: 'success', apiResponse: response.data });
    } catch (error) {
        console.error('Error calling the API:', error.response.data);
        res.status(500).json({ status: 'error', message: 'Failed to call the API' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
