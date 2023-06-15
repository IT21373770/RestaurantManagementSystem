const router = require("express").Router();
const chat = require("../models/chat");
const user = require("../models/user.model");

// Endpoint for customers to send a message to the admin
router.post('/', async (req, res) => {

  const {sender, message, reply, createdAt } = req.body;

  try {
    const newMessage = new chat({
      sender: sender,
      message: message,
      reply: reply,
      createdAt: createdAt
    });

    await newMessage.save();

    // Send the message back to the client
    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint for customers to get all their messages
router.get('/', async (req, res) => {
  try {
    //const senderId = req.query.senderId;
    const messages = await chat.find({})
  
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/mark-read', async (req, res) => {
  try {
    const { messageIds } = req.body;

    // Update the messages with the provided IDs and set read to true
    await chat.updateMany({ _id: { $in: messageIds } }, { read: true });

    res.status(200).json({ message: 'Messages marked as read' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// router.get('/chat/unreadCount', (req, res) => {
//   const currentUser = req.query.userId;
  
//   chat.countDocuments({ reply: currentUser, read: false })
//     .then((unreadCount) => {
//       res.json({ unreadCount });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     });
// });





module.exports = router;