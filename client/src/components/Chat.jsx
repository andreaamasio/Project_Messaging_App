import React, { useEffect, useState } from "react"

const Chat = ({ currentUser, selectedUser, token }) => {
  const API = import.meta.env.VITE_API_URL
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API}/message/${selectedUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error("Failed to fetch messages")
        const data = await res.json()
        setMessages(data.messages)
      } catch (err) {
        console.error(err)
      }
    }

    if (selectedUser) {
      fetchMessages()
    }
  }, [selectedUser, token])
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    try {
      const res = await fetch(`${API}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          //senderId: currentUser.id,
          receiverId: selectedUser.id, // recipient
          content: newMessage,
        }),
      })

      if (!res.ok) throw new Error("Failed to send message")

      const data = await res.json()
      const sentMessage = data.newMessage

      setMessages((prev) => [...prev, sentMessage])
      setNewMessage("")
    } catch (err) {
      console.error("Send error:", err)
    }
  }
  if (!currentUser) {
    return <div>Loading user info...</div>
  }
  return (
    <>
      <div className="chat-container">
        <h2 className="chat-header">
          Chat with {selectedUser.name}{" "}
          <span className="receiver-bio">"{selectedUser.bio}"</span>
        </h2>
        <div className="chat-messages">
          <ul>
            {messages.map((msg) => (
              <li
                key={msg.id}
                className={`message ${
                  msg.senderId === currentUser.id ? "self" : ""
                }`}
              >
                <strong>
                  {msg.senderId === currentUser.id ? "You" : selectedUser.name}
                </strong>
                {msg.content}
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage()
            }}
            className="chat-input"
          />
          <button onClick={handleSendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </>
  )
}

export default Chat
