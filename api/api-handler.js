const express = require("express");
const axios = require("axios");
require("dotenv").config(); // Load environment variables from .env

const app = express();
app.use(express.json());

const OPENAI_API_URL = "https://api.openai.com/v1/completions";
const apiKey = process.env.OPENAI_API_KEY; // API key stored in the .env file

// Route to handle quiz questions
app.post("/ask", async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ error: "No question provided." });
    }

    try {
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: "text-davinci-003",
                prompt: question,
                max_tokens: 100,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                }
            }
        );

        const answer = response.data.choices[0].text.trim();
        res.json({ answer });
    } catch (error) {
        console.error("Error fetching answer from OpenAI:", error);
        res.status(500).json({ error: "Failed to fetch answer from OpenAI." });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
