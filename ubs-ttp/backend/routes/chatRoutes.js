const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

router.post('/', async (req, res) => {
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ reply: "GEMINI_API_KEY is missing in environment" });
  }

  try {
    const { userMessage } = req.body;
    if (!userMessage) {
      return res.status(400).json({ reply: "No userMessage provided" });
    }

    const prompt = `You are a helpful assistant. Respond conversationally to this user message:\n"${userMessage}"`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let replyText = text;
    if (text.startsWith("```") && text.endsWith("```")) {
      replyText = text.slice(3, -3).trim();
    }

    res.json({ reply: replyText });
  } catch (err) {
    console.error('Error generating chat reply:', err);
    res.status(500).json({ reply: "Failed to generate chat reply" });
  }
});

module.exports = router;
