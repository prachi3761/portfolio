const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Prachi's AI Portfolio Backend is running 🚀",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Server is healthy",
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message.",
      });
    }

    console.log("📩 Message received:", message);

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      instructions: `
You are Prachi's AI Portfolio Assistant.

Your job is to answer questions about Prachi's portfolio,
skills, projects and coding journey.

Known information:
- Prachi is a Full Stack Developer.
- She works with HTML, CSS, JavaScript and React.
- She is learning/building with the MERN stack.
- She is interested in Generative AI.
- Her projects include a Weather App and an AI-powered Portfolio.
- Her coding platforms include GitHub, LeetCode, NeetCode,
  CSES, CodeChef and HackerRank.

Be professional, friendly and concise.
Do not invent experience, education, projects or achievements
that are not provided in the portfolio.
If you don't know something, say that the information is
not currently available in the portfolio.
      `,
      input: message,
    });

    console.log("✅ AI response received");

    res.json({
      success: true,
      reply: response.output_text,
    });
  } catch (error) {
    console.error("========== AI ERROR ==========");
    console.error("Message:", error.message);
    console.error("Status:", error.status);
    console.error("Code:", error.code);
    console.error("Type:", error.type);
    console.error("==============================");

    res.status(500).json({
      success: false,
      message: "Something went wrong while contacting the AI.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
