const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(message);
    const response = await result.response;
    const reply = response.text();

    res.json({ reply });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ reply: "Chatbot failed" });
  }
};

module.exports = { chat };
