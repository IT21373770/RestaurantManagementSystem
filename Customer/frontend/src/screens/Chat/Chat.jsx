import React, { useState, useEffect, useRef, useCallback } from "react";
import './chatbox.css';
import Header from "../../components/header";
import axios from "axios";
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import styled from 'styled-components';
// import { Send } from '@material-ui/icons';
import Footer from "../../components/Footer";
import CircularProgress from '@mui/material/CircularProgress';

const MessageWrapper = styled(Box)(({ isSentByCurrentUser }) => ({
  display: 'flex',
  flexDirection: isSentByCurrentUser ? 'row-reverse' : 'row',
  alignItems: 'flex-end',
  marginBottom: "16px",
}));

const MessageBubble = styled(Box)(({ isSentByCurrentUser }) => ({
  maxWidth: '80%',
  padding: "8px",
  marginRight: isSentByCurrentUser ? "10px" : "0",
  borderRadius: isSentByCurrentUser ? '20px 20px 0 20px' : '20px 20px 20px 0',
  backgroundColor: isSentByCurrentUser ? '#0084ff' : '#f0f0f0',
  color: isSentByCurrentUser ? '#fff' : '#333',
  alignSelf: isSentByCurrentUser ? 'flex-end' : 'flex-start',
  wordWrap: 'break-word',
  boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
}));

const MessageHeader = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: "5px",
}));

const MessageSender = styled(Typography)(() => ({
  fontSize: '0.8rem',
  fontWeight: 'bold',
  marginRight: "8px",
}));

const MessageTime = styled(Typography)(() => ({
  fontSize: '0.7rem',
  color: '#000000',
}));



function Chat() {




  const [message, setmessage] = useState('');

  const currentUser = JSON.parse(localStorage.getItem("userData"));


  const rec = "644df7666512eabcfd11aa19"

  const chatContainerRef = useRef(null);
  const previousMessagesLength = useRef(0);




  const [messages, setMessages] = useState([]);

  const fetchMessages = useCallback(() => {
    axios.get('http://localhost:8090/chat/')
      .then(res => {
        setMessages(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000); // request to server every 2 seconds
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!message) {
      // If message is empty, do not send
      return;
    }
    setIsSending(true);

    const newMessage = {
      sender: currentUser.user._id,
      message: message,
      reply: rec,
      createdAt: new Date()
    };



    axios.post('http://localhost:8090/chat/', newMessage)
      .then(() => {
        //window.location.reload(false);
        setMessages((messages) => [...messages, newMessage]);
        setmessage('')
        setIsSending(false)
      }).catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Scroll to the bottom of the chat container when new messages are received
    if (messages.length !== previousMessagesLength.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      previousMessagesLength.current = messages.length;
    }
  }, [messages]);

  useEffect(() => {
    // Mark messages as read 
    const unreadMessages = messages.filter(
      (m) => m.reply === currentUser.user._id && m.read === false
    );

    if (unreadMessages.length > 0) {
      const messageIds = unreadMessages.map((m) => m._id);

      axios
        .put('http://localhost:8090/chat/mark-read', { messageIds })
        .then(() => {
          // Update the read status of the messages locally
          setMessages((prevMessages) =>
            prevMessages.map((m) =>
              messageIds.includes(m._id) ? { ...m, read: true } : m
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [messages, currentUser.user._id]);

  // const [unreadCount, setUnreadCount] = useState(0);

  // const fetchUnreadCount = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:8090/unread-count/${currentUser.user._id}`);
  //     setUnreadCount(response.data.unreadCount);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [currentUser.user._id]);

  // useEffect(() => {
  //   fetchMessages();
  //   fetchUnreadCount();
  //   const interval = setInterval(() => {
  //     fetchMessages();
  //     fetchUnreadCount();
  //   }, 2000); // Request messages and unread count every 2 seconds
  //   return () => clearInterval(interval);
  // }, [fetchMessages, fetchUnreadCount]);

  return (
    <>
      <Header/>


      <Box sx={{
        flexGrow: 1,
        margin: "127px 30px 0 30px",
        backgroundColor: "#0000",
        padding: "20px",
        color: "#ffff",
        borderRadius: "20px",
      }}>


        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{ height: "70vh" }}>
              <List>

                <Paper variant="outlined" square elevation={0} sx={{ backgroundColor: "#d10b0b", marginRight: "10px" }}>
                  <ListItem  >
                    <ListItemText primary="Chat with Admin" sx={{ color: "#ffff" }} />
                  </ListItem>
                </Paper>

              </List>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box ref={chatContainerRef} sx={{ height: "calc(70vh - 64px)", overflowY: "scroll" }}>


              <div >
                {messages.filter(
                  (m) =>
                    (m.sender === currentUser.user._id && m.reply === rec) ||
                    (m.reply === currentUser.user._id && m.sender === rec)
                ).map((message) => (
                  <MessageWrapper
                    key={message._id}
                    isSentByCurrentUser={message.sender === currentUser.user._id}
                  >
                    <MessageBubble
                      isSentByCurrentUser={message.sender === currentUser.user._id}
                    >
                      <MessageHeader>
                        <MessageSender></MessageSender>
                        <MessageTime>
                          {new Date(message.createdAt).toLocaleString()}
                        </MessageTime>
                      </MessageHeader>
                      {message.message}
                    </MessageBubble>
                  </MessageWrapper>
                ))}
              </div>


            </Box>
            <Box sx={{ display: "flex", mt: 2 }}>
              <TextField
                fullWidth
                // placeholder={user.user._id}
                variant="outlined"
                label="Type your message here"
                value={message}
                onChange={(e) => setmessage(e.target.value)}
                sx={{ mr: 2, backgroundColor: "#8a8a8a" }}
              />
              <Button variant="contained" onClick={handleSubmit}
                disabled={message.trim().length === 0 || isSending}
              >
                {isSending ? <CircularProgress size={24} /> : "Send"}
              </Button>
            </Box>
          </Grid>
        </Grid>



      </Box>

      <Footer />



    </>
  )

}

export default Chat;
