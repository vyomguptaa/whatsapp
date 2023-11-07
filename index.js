
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
  console.log(req.body);
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
    payload: {
      type: req.body.payload.type,
      payload: {
        type: req.body.payload.payload.type,
      },
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
const allMessages = await collectMessages();
    let combinedMessageText = '';
    let quickRepliesFormatted = [];

    allMessages.forEach(m => {
      const payload = JSON.parse(m.messagePayload);
      combinedMessageText += payload.text + '\n';

      // Check for quick_replies and format them
      if (payload.quick_replies) {
        payload.quick_replies.forEach((quickReply) => {
          const formattedQuickReply = {
            app: "PlexusWhatsapInt", // Replace with your app name
            timestamp: new Date().getTime(),
            version: 2,
            type: "message",
            payload: {
              id: req.body.payload.id, // This should be a unique ID for the message
              source: req.body.payload.source,
              type: "text",
              payload: {
                text: quickReply.title,
                type: "button"
              },
              sender: {
                phone: req.body.payload.sender.phone,
                name: req.body.payload.sender.name,
                country_code: req.body.payload.sender.country_code,
                dial_code: req.body.payload.sender.dial_code,
              },
            }
          };

          // Add to quickRepliesFormatted array
          quickRepliesFormatted.push(formattedQuickReply);
          console.log('Formatted quick reply:', formattedQuickReply);
        });
      }
    });

    // If there are quick replies, send them, otherwise send the combined text
    if (quickRepliesFormatted.length > 0) {
      // return res.json({ messages: combinedMessageText.trim(), quickReplies: quickRepliesFormatted });
      // return res.send(quickRepliesFormatted);
      return res.send(combinedMessageText.trim());
    } else {
      return res.send(combinedMessageText.trim());
    }


  } catch (error) {
    console.error('Error calling the chatbot API:', error.response ? error.response.data : error.message);
    return res.status(500).json({ status: 'error', message: 'Failed to call the chatbot API' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
