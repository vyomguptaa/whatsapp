
// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');
// const { EventEmitter } = require('events');

// const app = express();
// app.use(bodyParser.json());

// const API_URL = 'https://conv.chatclay.com/webhook/voice';
// const API_KEY = 'JXNHGFmWMDFWZ4LtdHYStE'; 

// const events = new EventEmitter();  // Create an event emitter

// app.post('/chatbot-reply', async (req, res) => {
//     console.log('Received reply from chatbot 2:', req.body);
//     events.emit('receivedChatbotReply', req.body);  // Emit event when data is received
//     return res.json({ messagePayload: req.body });
// });

// const handleRequest2 = async (req, res) => {
//     // console.log(req.body);
//     if (!req.body.payload || !req.body.payload.payload || !req.body.payload.payload.text) {
//         console.log('The text property is not defined, returning nothing.');
//         return res.status(400).json({ status: 'error', message: 'No text provided' });
//     }
//     const dataToSend = {
//         bot: "6541f452234d442ffb2dc202",
//         sender: {
//             id: "6505d8ffbd59247f06e0ebaa",
//             // id: req.body.payload.id,
//             name: req.body.payload.sender.name,
//             data: {}
//         },
//         message: {
//             text: req.body.payload.payload.text,
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

//         // console.log('please', response.data);

//         // Await for the event to be emitted .......
//         const answer = await new Promise(resolve => events.once('receivedChatbotReply', resolve));
//         let parsedPayload = JSON.parse(answer.messagePayload);
//         console.log('Received text:', parsedPayload.text);
//         return res.send(parsedPayload.text);

//     } catch (error) {
//         console.error('Error calling the API 3:', error.response ? error.response.data : error.message);
//         res.status(500).json({ status: 'error', message: 'Failed to call the API' });
//     }
// };

// app.post('/callback', async (req, res) => {
//     // console.log('Received request from Gupshup:', req.body);
//     await handleRequest2(req, res);
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });
//
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { EventEmitter } = require('events');

const app = express();
app.use(bodyParser.json());

const API_URL = 'https://conv.chatclay.com/webhook/voice';
const API_KEY = 'JXNHGFmWMDFWZ4LtdHYStE'; 

const events = new EventEmitter();

// Function to handle collecting messages until the last one is received
const collectMessages = (timeout = 30000) => {
  return new Promise((resolve, reject) => {
    const messages = [];
    const timer = setTimeout(() => {
      events.removeAllListeners('receivedChatbotReply');
      reject(new Error('Timeout waiting for the last message'));
    }, timeout);

    const listener = (data) => {
      messages.push(data);

      // Assuming 'is_last_message' is a boolean that's true for the last message.
      if (data.is_last_message) {
        clearTimeout(timer);
        events.removeListener('receivedChatbotReply', listener);
        resolve(messages);
      }
    };

    events.on('receivedChatbotReply', listener);
  });
};

app.post('/chatbot-reply', (req, res) => {
  console.log('Received reply from chatbot:', req.body);
  events.emit('receivedChatbotReply', req.body);
  return res.json({ messagePayload: req.body });
});

app.post('/callback', async (req, res) => {
  if (!req.body.payload || !req.body.payload.payload || !req.body.payload.payload.text) {
    console.log('The text property is not defined, returning nothing.');
    return res.status(400).json({ status: 'error', message: 'No text provided' });
  }

  const dataToSend = {
    bot: "6541f452234d442ffb2dc202",
    sender: {
      id: "6505d8ffbd59247f06e0ebaa",
      name: req.body.payload.sender.name,
      data: {}
    },
    message: {
      text: req.body.payload.payload.text,
      locale: ""
    },
    timestamp: req.body.timestamp
  };

  try {
    await axios.post(API_URL, dataToSend, {
      headers: {
        'x-api-key': API_KEY,
        'content-type': 'application/json'
      }
    });

    // Wait for all messages to be received
    const allMessages = await collectMessages();
    // console.log("quick", allMessages.map(m => JSON.parse(m.messagePayload).quick_replies);
    const payload3 = JSON.parse(m.messagePayload);
    if (payload3.quick_replies) {
        console.log('Quick replies:', payload.quick_replies);
      }
    const combinedMessageText = allMessages.map(m => JSON.parse(m.messagePayload).text).join('\n');
    // console.log(combinedMessageText);
    return res.send(combinedMessageText);
    // Return all messages as a response
    // return res.json({ messages: allMessages.map(m => m.messagePayload.text) });

  } catch (error) {
    console.error('Error calling the chatbot API:', error.response ? error.response.data : error.message);
    return res.status(500).json({ status: 'error', message: 'Failed to call the chatbot API' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
