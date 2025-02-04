import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chat_component.css";

function Chat_Component() {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const chatHistoryRef = useRef(null); // Reference to chat history div
  const inputRef = useRef(null); // Reference to input element

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]); // Dependency on messages array

  useEffect(() => {
    // Focus on the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  const sendMessageToBot = async (message) => {
    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: message },
      ]);

      const response = await axios.post("Api/parse", {
        message: message,
      });

      if (response.data && response.data.output) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: response.data.output },
        ]);
      } else {
        throw new Error("Invalid response from the bot");
      }
    } catch (error) {
      console.error("Error communicating with the bot:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Sorry, there was an error." },
      ]);
    }
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (userMessage.trim()) {
      sendMessageToBot(userMessage);
      setUserMessage("");
    }
  };

  return (
    <div className="chatbot">
      <div className="chat-history" ref={chatHistoryRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.sender === "user" ? "user" : "bot"
            }`}
          >
            <span>{message.text}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={userMessage}
          onChange={handleUserMessageChange}
          placeholder="Type a message"
          className="chat-input"
          ref={inputRef}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat_Component;
