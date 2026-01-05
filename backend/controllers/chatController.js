// backend/controllers/chatController.js
const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// AI Chat endpoint
const sendMessageToAI = async (req, res) => {
    try {
        const { message, context } = req.body; // context can include syllabus, plan, etc.

        // Construct Gemini prompt
        const prompt = `
You are a smart AI study assistant for Indian college students.
Answer concisely and helpfully. Context: ${JSON.stringify(context)}
Student asked: ${message}
`;

        const response = await axios.post('https://api.gemini.ai/v1/generate', {
            prompt
        }, {
            headers: { 'Authorization': `Bearer ${GEMINI_API_KEY}` }
        });

        const reply = response.data?.text || 'Sorry, I could not generate a response.';

        res.json({ success: true, reply });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, reply: 'Server Error' });
    }
};

module.exports = { sendMessageToAI };
