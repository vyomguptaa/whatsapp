const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

const API_URL = 'https://conv.chatclay.com/webhook/voice';
const API_KEY = 'X7EPhTxGee3tnfYCysxQXW'; 
const handleRequest2 = async (req, res) => {
    const dataToSend = {
        bot: "648701bbbf3af915b60daa2d",
        sender: {
            id: "6505d8ffbd59247f06e0ebaa",
            name: "summer",
            data: {}
        },
        message: {
            text: req.body.payload.payload.text,
            locale: ""
        },
        timestamp: req.body.timestamp
    };

    try {
        const response = await axios.post(API_URL, dataToSend, {
            headers: {
                'x-api-key': 'X7EPhTxGee3tnfYCysxQXW',
                'content-type': 'application/json'
            }
        });
        console.log('please', response.data);
        // If the incoming request has messagePayload, then return it
        // if (req.body.messagePayload) {
        //     console.log('Response Data from API1:', req.body);
        //     console.log('Received reply from chatbot handle:', req.body.message);
        //     return res.json({ messagePayload: req.body.messagePayload });
        // } else {
        //     console.log('Response Data from API2:', response.data);
        //     console.log('Received request:', req.body);
        //     // return res.json(req.body);
        // }

        
        // const chatbotReply = await axios.post('https://whatsapp-wo7o.onrender.com/chatbot-reply', { message: response.data.message });
        // console.log('give', chatbotReply);
        app.post('/chatbot-reply', async (req, res) => {
            console.log('Received reply from chatbot 2:', req.body.message);
            return res.json({ messagePayload: req.body.message });
        });
        // Return the message from the chatbot-reply response
        // return res.json({ messagePayload: chatbotReply.data.messagePayload });
    } catch (error) {
        console.error('Error calling the API 3:', error.response ? error.response.data : error.message);
        res.status(500).json({ status: 'error', message: 'Failed to call the API' });
    }
};

app.post('/callback', async (req, res) => {
    console.log('Received request from Gupshup:', req.body);
    await handleRequest2(req, res);
});


// app.post('/chatbot-reply', async (req, res) => {
//     console.log('Received reply from chatbot:', req.body.message);
    

//     // await handleRequest2(req, res);
//     return res.json({ messagePayload: req.body.message });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
