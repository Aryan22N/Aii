const axios = require('axios');

const GEN_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const chatbotReply = async (message) => {
    const prompt = `
You are a helpful AI study assistant for Indian college students.
Answer clearly and simply.

Student Question:
${message}
`;

    const response = await axios.post(
        GEN_URL,
        { contents: [{ parts: [{ text: prompt }] }] },
        {
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': process.env.GEMINI_API_KEY
            }
        }
    );

    return (
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Sorry, I could not answer that.'
    );
};

module.exports = { chatbotReply };
