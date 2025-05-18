//import "./NavBar.css"
import React, { useRef, useState, useEffect } from "react"

const API = "http://localhost:3000"

function SideBar() {
  const [userList, setUserList] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${API}/user`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const json = await response.json()
        console.log("Fetched users:", json.data)
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
    <>
      {!loading && !error && (
        <ul className="friend-list">
          {userList.map((user) => {
            return (
              <li
                key={user.id}
                //onClick={}
              >
                <img src={user.avatarUrl} alt={`${user.name} avatar`} />
                {user.name}{" "}
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}

export default SideBar
