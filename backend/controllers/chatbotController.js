const { chatbotReply } = require("../services/geminiChatbot");

const chat = async (req, res) => {
  try {
    const { message } = req.body;
    const reply = await chatbotReply(message);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Chatbot failed" });
  }
};

module.exports = { chat };
