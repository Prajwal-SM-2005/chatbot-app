import React, { useState } from "react";
import axios from "axios";
import "./Chat.css";

function App() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (!input) return;
        const newMessages = [...messages, { text: input, sender: "user" }];
        setMessages(newMessages);
        setInput("");

        try {
            const res = await axios.post("http://localhost:5000/chat", { message: input });
            setMessages([...newMessages, { text: res.data.reply, sender: "bot" }]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="chat-container">
            <h2>ChatBot</h2>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <p key={index} className={`message ${msg.sender}`}>
                        <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
                    </p>
                ))}
            </div>
            <div className="input-container">
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default App;
