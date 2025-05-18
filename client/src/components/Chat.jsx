import React, { useEffect, useState } from "react"

const Chat = ({ currentUser, selectedUser, token }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/message/${selectedUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

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

  return (
    <div className="chat-container">
      <h2 className="chat-header">Chat with {selectedUser.name}</h2>
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
  )
}

export default Chat
