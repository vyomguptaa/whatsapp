// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');

// const app = express();

// // Middleware to parse JSON requests
// app.use(bodyParser.json());

// const API_URL = 'https://conv.chatclay.com/api/648701bbbf3af915b60daa2d/send';
// const API_KEY = 'X7EPhTxGee3tnfYCysxQXW';

// app.post('/callback', async (req, res) => {
//     console.log('Received callback:', req.body);

//     // Example data you might send, customize as needed
//     const dataToSend = {
//         user: "648ebc698a80400573b5acfb",
//         flow: "GetStarted",
//         entities: {}  // Optional
//     };

//     try {
//         const response = await axios.post(API_URL, dataToSend, {
//             headers: {
//                 'x-api-key': API_KEY,
//                 'content-type': 'application/json'
//             }
//         });
//         // console.log('API Response:', response.data);
//         // res.json({ status: 'success', apiResponse: response.data });
//         const botReplyPayload = {
//             sender: {
//                 id: "648701bbbf3af915b60daa2d",  // Assuming this is your bot_id
//                 name: "BOT"
//             },
//             message: {
//                 text: response.data.message.text,
//                 locale: response.data.message.locale || "en"  // defaulting to "en" if locale is not present
//             },
//             user_data: response.data.user_data || {},  // defaulting to an empty object if user_data is not present
//             timestamp: Date.now().toString()  // Current timestamp in milliseconds
//         };

//         console.log('BotReply Payload:', botReplyPayload);
//         console.log('API Response:', response.data);

//         res.json({ status: 'success', apiResponse: response.data, botReplyPayload: botReplyPayload });
//     } catch (error) {
//         console.error('Error calling the API:', error.response.data);
//         res.status(500).json({ status: 'error', message: 'Failed to call the API' });
//     }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

const API_URL = 'https://conv.chatclay.com/webhook/voice';
const API_KEY = 'X7EPhTxGee3tnfYCysxQXW';  // Replace 'enter' with your actual API key

app.post('/callback', async (req, res) => {
    console.log('Received request:', req.body);

    const dataToSend = {
        bot: "648701bbbf3af915b60daa2d",
        sender: {
            id: "6505d8ffbd59247f06e0ebaa",
            name: "summer",
            data: {}
        },
        message: {
            text: "hi",
            locale: ""
        },
        timestamp: req.body.timestamp
    };

    try {
        const response = await axios.post(API_URL, dataToSend, {
            headers: {
                'x-api-key': API_KEY,
                'content-type': 'application/json'
            }
        });
        console.log('Response Data:', response.data);
        
        // console.log('Response text:', req.body.message.text);
        const parsedMessagePayload = JSON.parse(req.body.messagePayload);
        const extractedText = parsedMessagePayload.text;
        console.log(extractedText);
        // res.setHeader('Content-Type', 'application/json');
        // res.json({ messagesPayload: response.data});
        res.json({ status: 'success', apiResponse: response.data });
        // res.json({message: req.body});
    } catch (error) {
        console.error('Error calling the API:', error.response ? error.response.data : error.message);
        res.status(500).json({ status: 'error', message: 'Failed to call the API' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
