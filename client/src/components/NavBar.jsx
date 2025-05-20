import React, { useState, useEffect } from "react"
//import "./Navbar.css"

const Navbar = ({ user, onLogout, token }) => {
  const [editingName, setEditingName] = useState(false)
  const [editingBio, setEditingBio] = useState(false)
  const [newName, setNewName] = useState("")
  const [newBio, setNewBio] = useState("")
  useEffect(() => {
    if (user) {
      setNewName(user.name || "")
      setNewBio(user.bio || "")
    }
  }, [user])
  const handleUserSave = async () => {
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔑 Important!
        },
        body: JSON.stringify({
          name: newName,
          bio: newBio,
        }),
      })

      const contentType = response.headers.get("content-type")

      if (!response.ok) {
        let errorMsg = "Update failed"
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json()
          errorMsg = errorData.message || errorMsg
        } else {
          const text = await response.text()
          errorMsg = text || errorMsg
        }
        throw new Error(errorMsg)
      }

      const data = await response.json()
      console.log("✅ Updated user:", data.newUser)

      setEditingName(false)
      setEditingBio(false)
    } catch (err) {
      console.error("❌ Failed to update user:", err.message)
    }
  }

  return (
    <nav className="navbar">
      {user ? (
        <>
          <div className="navbar-left">
            {editingName ? (
              <input
                className="edit-input"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUserSave()
                  }
                }}
                onBlur={handleUserSave}
                autoFocus
              />
            ) : (
              <>
                <span>Welcome back, {newName}</span>
                <button
                  className="edit-btn"
                  onClick={() => setEditingName(true)}
                >
                  ✏️
                </button>
              </>
            )}
          </div>

          <div className="navbar-center">
            {editingBio ? (
              <input
                className="edit-input"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUserSave()
                  }
                }}
                onBlur={handleUserSave}
                autoFocus
              />
            ) : (
              <>
                <span>{newBio}</span>
                <button
                  className="edit-btn"
                  onClick={() => setEditingBio(true)}
                >
                  ✏️
                </button>
              </>
            )}
          </div>

          <div className="navbar-right">
            <button className="logout-button" onClick={onLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="navbar-left">
            <a href="https://github.com/andreaamasio">
              <img
                src="/pictures/github-60.svg"
                alt="GitHub Logo"
                className="github-logo"
              />
            </a>
          </div>

          <div className="navbar-center">
            <span>Messaging App</span>
          </div>

          <div className="navbar-right" />
        </>
      )}
    </nav>
  )
}

export default Navbar
