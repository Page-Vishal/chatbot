import Chat_component from "./assets/Chat_Component.jsx";
import chatbot from "./assets/chatbot.png";

import "./App.css";

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img src={chatbot} alt="Chatbot Logo" className="navbar-logo" />
          <span className="navbar-title">ChatBot</span>
        </div>
        <button className="Home">Home</button>
      </nav>

      <Chat_component />
    </>
  );
}

export default App;
