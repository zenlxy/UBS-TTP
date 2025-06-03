const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

router.post("/", async (req, res) => {
  console.log("Using GEMINI API Key:", GEMINI_API_KEY ? "***key loaded***" : "No key found");

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ message: "GEMINI_API_KEY is missing in environment" });
  }

  try {
    const { interests } = req.body;
    console.log("Received interests from user:", interests);
    if (!interests || interests.length === 0) {
      return res.status(400).json({ message: "No interests provided" });
    }

    const prompt = `Suggest 5 relevant and beginner-friendly online courses for someone interested in: ${interests.join(", ")}. Return the response as a valid JSON array like: [{"title": "...", "description": "..."}, ...]. Do not include any additional text, Markdown, or code block delimiters (e.g., \`\`\`json) outside the JSON itself.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let jsonString = text;
    if (text.startsWith("```json") && text.endsWith("```")) {
      jsonString = text.slice(7, -3).trim();
    } else if (text.startsWith("```") && text.endsWith("```")) {
      jsonString = text.slice(3, -3).trim();
    }

    let recommendations;
    try {
      recommendations = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError.message, "Raw response:", text);
      return res.status(500).json({ message: "Failed to parse AI response as JSON", rawResponse: text });
    }

    res.json({ recommendations });
  } catch (err) {
    console.error("Error generating recommendations:", err.message);
    res.status(500).json({ message: "Failed to generate recommendations", error: err.message });
  }
});

module.exports = router;