import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, IconButton, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input.trim() };
    const botReply = { from: 'bot', text: "This is a placeholder reply" };

    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)', 
        p: 4,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Chat with LearnBot
      </Typography>

      <Box
        sx={{
            height: 'calc(100% - 100px)',
            overflowY: 'auto',
            p: 2,
        }}
        >
        {messages.map((msg, index) => (
          <Box
            key={index}
            textAlign={msg.from === 'user' ? 'right' : 'left'}
            mb={1}
          >
            <Typography
              variant="body1"
              sx={{
                display: 'inline-block',
                bgcolor: msg.from === 'user' ? '#7b2ff7' : '#e0e0e0',
                color: msg.from === 'user' ? 'white' : 'black',
                px: 2,
                py: 1,
                borderRadius: 2,
                maxWidth: '75%',
              }}
            >
              {msg.text}
            </Typography>
          </Box>
        ))}
        <div ref={chatEndRef} />
      </Box>

      <Stack direction="row" spacing={1} mt={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Chatbot;
