import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMsg = async () => {
    if (!msg.trim()) return;

    const userMsg = { from: "user", text: msg };
    setChat((prev) => [...prev, userMsg]);
    setMsg("");

    try {
      const res = await axios.post(
        "http://localhost:5001/api/chatbot",
        { message: msg },
        { headers: { "Content-Type": "application/json" } }
      );

      setChat((prev) => [
        ...prev,
        { from: "bot", text: res.data.reply }
      ]);
    } catch {
      setChat((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, something went wrong." }
      ]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-xl z-50"
      >
        🤖
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-black text-white rounded-xl shadow-xl flex flex-col z-50">

          {/* Header */}
          <div className="p-3 bg-purple-700 rounded-t-xl font-bold text-center">
            Study Assistant
          </div>

          {/* Messages (Scrollable) */}
          <div className="flex-1 p-3 overflow-y-auto max-h-72 space-y-2">
            {chat.map((c, i) => (
              <div
                key={i}
                className={`flex ${
                  c.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <span
                  className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${
                    c.from === "user"
                      ? "bg-purple-600"
                      : "bg-white/20"
                  }`}
                >
                  {c.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-2 flex gap-2 border-t border-white/10">
            <input
              className="flex-1 bg-black/40 p-2 rounded text-sm outline-none"
              placeholder="Ask something..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMsg()}
            />
            <button
              onClick={sendMsg}
              className="bg-purple-600 px-3 rounded text-sm"
            >
              Send
            </button>
          </div>

        </div>
      )}
    </>
  );
}

export default ChatBot;
