const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await axios.post(endpoint, {
            prompt: { text: message },
            maxTokens: 100
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error communicating with Gemini AI' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
