const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

const API_URL = 'https://conv.chatclay.com/api/5f20b9c83b820631fdb738eb/send';
const API_KEY = 'YH9kHzF5p4wk5b3zuHJ3LH';

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
//         console.log('API Response:', response.data);
//         res.json({ status: 'success', apiResponse: response.data });
//     } catch (error) {
//         console.error('Error calling the API:', error.response.data);
//         res.status(500).json({ status: 'error', message: 'Failed to call the API' });
//     }
// });
app.post('/callback', async (req, res) => {
    console.log('Received callback:', req.body);
    
    // Check if the callback type is a message
    if(req.body.type === 'message' && req.body.payload.type === 'text') {
        const senderId = req.body.payload.id;
        const senderName = req.body.payload.sender.name;
        const textMessage = req.body.payload.payload.text;
        const timestamp = req.body.timestamp;

        // Construct payload for Chatclay
        const chatclayPayload = {
            bot: "5f20b9c83b820631fdb738eb", 
            user: senderId,
            flow: "GetStarted",
            entities: {},
            // Assuming this is your Chatclay bot ID
            sender: {
                id: senderId,
                name: senderName,
                data: {} // Add any custom data if required
            },
            message: {
                text: textMessage,
                locale: "en" // You can adjust this based on the user's preference or language detection
            },
            timestamp: timestamp
        };

        try {
            const chatclayResponse = await axios.post(API_URL, chatclayPayload, {
                headers: {
                    'x-api-key': API_KEY,
                    'content-type': 'application/json'
                }
            });
            
            // Extract the bot reply from Chatclay's response
            const botReply = chatclayResponse.data.message.text;
            
            // TODO: Forward this botReply to the user on WhatsApp using GupShup's APIs
            // You'd typically use another endpoint of GupShup to send a message to the user. 

            console.log('Chatclay Bot Response:', botReply);
            res.json({ status: 'success', botReply: botReply });
        } catch (error) {
            console.error('Error calling the API:', error.response ? error.response.data : error.message);
            res.status(500).json({ status: 'error', message: 'Failed to call the API' });
        }
    } else {
        // Handle other types of callbacks if needed
        res.json({ status: 'ignored', message: 'Callback not of type message/text' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
