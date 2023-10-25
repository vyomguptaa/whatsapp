// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const axios = require('axios');

// // const app = express();

// // // Middleware to parse JSON requests
// // app.use(bodyParser.json());

// // const API_URL = 'https://conv.chatclay.com/api/648701bbbf3af915b60daa2d/send';
// // const API_KEY = 'X7EPhTxGee3tnfYCysxQXW';

// // app.post('/callback', async (req, res) => {
// //     console.log('Received callback:', req.body);

// //     // Example data you might send, customize as needed
// //     const dataToSend = {
// //         user: "648ebc698a80400573b5acfb",
// //         flow: "GetStarted",
// //         entities: {}  // Optional
// //     };

// //     try {
// //         const response = await axios.post(API_URL, dataToSend, {
// //             headers: {
// //                 'x-api-key': API_KEY,
// //                 'content-type': 'application/json'
// //             }
// //         });
// //         // console.log('API Response:', response.data);
// //         // res.json({ status: 'success', apiResponse: response.data });
// //         const botReplyPayload = {
// //             sender: {
// //                 id: "648701bbbf3af915b60daa2d",  // Assuming this is your bot_id
// //                 name: "BOT"
// //             },
// //             message: {
// //                 text: response.data.message.text,
// //                 locale: response.data.message.locale || "en"  // defaulting to "en" if locale is not present
// //             },
// //             user_data: response.data.user_data || {},  // defaulting to an empty object if user_data is not present
// //             timestamp: Date.now().toString()  // Current timestamp in milliseconds
// //         };

// //         console.log('BotReply Payload:', botReplyPayload);
// //         console.log('API Response:', response.data);

// //         res.json({ status: 'success', apiResponse: response.data, botReplyPayload: botReplyPayload });
// //     } catch (error) {
// //         console.error('Error calling the API:', error.response.data);
// //         res.status(500).json({ status: 'error', message: 'Failed to call the API' });
// //     }
// // });

// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //     console.log(`Server started on port ${PORT}`);
// // });
// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');

// const app = express();

// // Middleware to parse JSON requests
// app.use(bodyParser.json());

// const API_URL = 'https://conv.chatclay.com/webhook/voice';
// const API_KEY = 'X7EPhTxGee3tnfYCysxQXW';  // Replace 'enter' with your actual API key

// app.post('/callback', async (req, res) => {
//     // console.log('Received request:', req.body);

//     const dataToSend = {
//         bot: "648701bbbf3af915b60daa2d",
//         sender: {
//             id: "6505d8ffbd59247f06e0ebaa",
//             name: "summer",
//             data: {}
//         },
//         message: {
//             text: "hi",
//             locale: ""
//         },
//         timestamp: req.body.timestamp
//     };

//     try {
//         const response = await axios.post(API_URL, dataToSend, {
//             headers: {
//                 'x-api-key': API_KEY,
//                 'content-type': 'application/json'
//             }
//         });
//         console.log('Response Data:', response.data);
        
//         console.log('Response text:', req.body);
//         // const parsedMessagePayload = JSON.parse(req.body.messagePayload);
//         // const extractedText = parsedMessagePayload.text;
//         // console.log(extractedText);
//         // res.setHeader('Content-Type', 'application/json');
//         // res.json({ messagesPayload: response.data});
//         res.json({ status: 'success', apiResponse: req.body });
//         // res.json({message: req.body});
//     } catch (error) {
//         console.error('Error calling the API:', error.response ? error.response.data : error.message);
//         res.status(500).json({ status: 'error', message: 'Failed to call the API' });
//     }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });


// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');

// const app = express();

// // Middleware to parse JSON requests
// app.use(bodyParser.json());

// const API_URL = 'https://conv.chatclay.com/webhook/voice';
// const API_KEY = 'X7EPhTxGee3tnfYCysxQXW'; 

// const handleRequest = async (req, res, currentReq) => {
//     const dataToSend = {
//         bot: "648701bbbf3af915b60daa2d",
//         sender: {
//             id: "6505d8ffbd59247f06e0ebaa",
//             name: "summer",
//             data: {}
//         },
//         message: {
//             text: "hi",
//             locale: ""
//         },
//         timestamp: req.body.timestamp
//     };

//     try {
//             // if (req2.body.payload) || (req3.body.messagePayload( {
        
//                 const response = await axios.post(API_URL, dataToSend, {
//                     headers: {
//                         'x-api-key': API_KEY,
//                         'content-type': 'application/json'
//                     }
//                 });
//                 console.log('Response Data from API:', response.data);
//                 console.log('Received reply from chatclay:', currentReq.body);
            
//                 console.log('Received reply from gupshup details:', currentReq.body);
//                 res.json(currentReq.body); 
//         // }
//     } catch (error) {
//         console.error('Error calling the API:', error.response ? error.response.data : error.message);
//         res.status(500).json({ status: 'error', message: 'Failed to call the API' });
//     }
// };

// app.post('/callback', async (req2, res2) => {
//     console.log('Received request from Gupshup:', req2.body);
//     await handleRequest(req2, res2, req2);
// });

// app.post('/chatbot-reply', async (req3, res3) => {
//     console.log('Received reply from chatbot:', req3.body.message);
//     await handleRequest(req3, res3, req3);
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const API_URL = 'https://conv.chatclay.com/webhook/voice';

const handleCallback = async (req, res) => {
    const requestBody = req.body;

    const dataToSend = {
        bot: "648701bbbf3af915b60daa2d",
        sender: {
            id: "6505d8ffbd59247f06e0ebaa",
            name: "summer",
            data: {}
        },
        message: {
            text: requestBody.payload.payload.text,
            locale: ""
        },
        timestamp: requestBody.timestamp
    };

    try {
        const response = await axios.post(API_URL, dataToSend, {
            headers: {
                'x-api-key': 'X7EPhTxGee3tnfYCysxQXW',
                'content-type': 'application/json'
            }
        });
        console.log('Response from API:', response.data);

        // Now call the chatbot-reply endpoint
        const chatbotReply = await axios.post('https://whatsapp-wo7o.onrender.com/callback', response.data);
        console.log('Chatbot Reply:', chatbotReply.data);

        // Use the chatbotReply's data as the response for the /callback endpoint
        return res.json({ messagePayload: chatbotReply.data });

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ status: 'error', message: 'Failed to call the API' });
    }
};

app.post('/callback', handleCallback);

// For the /chatbot-reply endpoint, if it's still accessible externally, 
// it simply echoes back the incoming request body
// app.post('/chatbot-reply', (req, res) => {
//     console.log('Received reply from chatbot:', req.body);
//     return res.json({ messagePayload: req.body });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

