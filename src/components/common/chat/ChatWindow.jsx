import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const ChatWindow = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const URL = "http://localhost:5000";

    const socket = io(URL);
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && newMessage) {
      // Gửi tin nhắn lên máy chủ
      socket.emit("send-msg", { msg: newMessage });

      // Xóa nội dung tin nhắn sau khi gửi
      setNewMessage("");
    }
  };

  return (
    <div>
      <h1>Chat Real-time</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Gửi</button>
    </div>
  );
};

export default ChatWindow;
