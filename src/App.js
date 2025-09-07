import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import botAvatar from "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Favatar-bot&psig=AOvVaw1ToiAWNlDr3zHgpwdlOdeI&ust=1757338515794000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJCxmaLixo8DFQAAAAAdAAAAABAE";
import userAvatar from "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fdefault-profile-picture-avatar-user-icon-vector-46389216&psig=AOvVaw29eLtkVuntKfwWmBZu26ry&ust=1757338561778000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNDAsbvixo8DFQAAAAAdAAAAABAE";

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function App() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  const API_BASE_URL = "https://hosted-app-llm-bot-atmn.onrender.com"; // Your backend URL

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isBotTyping]);

  async function sendQuestion() {
    if (!question.trim()) return;
    
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", message: question, timestamp: new Date() },
    ]);
    setQuestion("");
    setLoading(true);
    setIsBotTyping(true);

    try {
      const res = await fetch(`${API_BASE_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", message: data.answer || "No response", timestamp: new Date(), feedback: null },
      ]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", message: "Error contacting server", timestamp: new Date(), feedback: null },
      ]);
    } finally {
      setLoading(false);
      setIsBotTyping(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") sendQuestion();
  }

  function handleFeedback(idx, type) {
    setChatHistory(prev =>
      prev.map((msg, i) => i === idx ? { ...msg, feedback: type } : msg)
    );
  }

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        border: "1px solid #ddd",
        borderRadius: 8,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        backgroundColor: isDarkMode ? "#222" : "#fff",
        color: isDarkMode ? "#fff" : "#000"
      }}
    >
      <header
        style={{
          padding: "1rem",
          borderBottom: "1px solid #ddd",
          backgroundColor: isDarkMode ? "#333" : "#f7f7f7",
          textAlign: "center",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h1 style={{ margin: 0 }}>Zeba's Chatbot</h1>
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={setDarkMode}
          size={28}
          sunColor="#FFA500"
          moonColor="#4B9CE2"
        />
      </header>

      <section
        style={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          backgroundColor: isDarkMode ? "#121212" : "#FFDB58",
        }}
      >
        {chatHistory.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: msg.sender === "user" ? "row-reverse" : "row",
              gap: 8,
            }}
          >
            <img
              src={msg.sender === "user" ? userAvatar : botAvatar}
              alt={msg.sender + " avatar"}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: isDarkMode ? "1px solid #555" : "none",
              }}
            />
            <div
              style={{
                maxWidth: "70%",
                padding: "0.75rem 1.25rem",
                borderRadius: 20,
                fontSize: 16,
                wordWrap: "break-word",
                backgroundColor: msg.sender === "user" ? "#4B9CE2" : (isDarkMode ? "#333" : "#E5E5EA"),
                color: msg.sender === "user" ? "#fff" : (isDarkMode ? "#ddd" : "#000"),
                borderTopRightRadius: msg.sender === "user" ? 0 : 20,
                borderTopLeftRadius: msg.sender === "user" ? 20 : 0,
                position: "relative",
              }}
            >
              <div>{msg.message}</div>
              <div
                style={{
                  fontSize: 11,
                  opacity: 0.6,
                  marginTop: 4,
                  textAlign: "right",
                  userSelect: "none",
                }}
              >
                {formatTime(new Date(msg.timestamp))}
              </div>

              {/* Feedback buttons only on bot messages */}
              {msg.sender === "bot" && (
                <div style={{ marginTop: 6, textAlign: "right" }}>
                  <button
                    onClick={() => handleFeedback(i, "up")}
                    style={{
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      color: msg.feedback === "up" ? "green" : "#888",
                      fontSize: 20,
                      marginRight: 6,
                    }}
                    aria-label="Thumbs up"
                  >
                    👍
                  </button>
                  <button
                    onClick={() => handleFeedback(i, "down")}
                    style={{
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      color: msg.feedback === "down" ? "red" : "#888",
                      fontSize: 20,
                    }}
                    aria-label="Thumbs down"
                  >
                    👎
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {isBotTyping && (
          <div
            style={{
              fontStyle: "italic",
              color: isDarkMode ? "#aaa" : "#666",
              marginTop: 12,
            }}
          >
            Bot is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </section>

      <footer
        style={{
          display: "flex",
          borderTop: "1px solid #ddd",
          backgroundColor: isDarkMode ? "#333" : "#f7f7f7",
          padding: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flexGrow: 1,
            fontSize: 16,
            padding: "0.5rem 1rem",
            borderRadius: 20,
            border: "1px solid #ccc",
            outline: "none",
            backgroundColor: isDarkMode ? "#555" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
          }}
          disabled={loading}
        />
        <button
          onClick={sendQuestion}
          disabled={loading || !question.trim()}
          style={{
            marginLeft: 12,
            padding: "0.5rem 1.5rem",
            borderRadius: 20,
            border: "none",
            backgroundColor: "#4B9CE2",
            color: "#fff",
            fontSize: 16,
            cursor: loading || !question.trim() ? "not-allowed" : "pointer",
            opacity: loading || !question.trim() ? 0.6 : 1,
          }}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </footer>
    </div>
  );
}
