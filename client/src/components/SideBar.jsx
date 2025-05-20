//import "./NavBar.css"
import React, { useRef, useState, useEffect } from "react"

const API = "http://localhost:3000"

function SideBar({ onUserSelect }) {
  const [userList, setUserList] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:3000/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const json = await response.json()
        console.log("Full response from /user:", json)
        setUserList(json.data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])
  return (
    <aside className="sidebar">
      <h2>Send a message to:</h2>
      <ul className="friend-list">
        {userList.map((user) => (
          <li key={user.id} onClick={() => onUserSelect(user)}>
            {/* <img src={user.avatarUrl} alt={`${user.name} avatar`} /> */}
            {user.name}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default SideBar
