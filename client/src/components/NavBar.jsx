import React, { useState, useEffect } from "react"
//import "./Navbar.css"

const Navbar = ({ user, onLogout }) => {
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
  const handleNameSave = () => {
    // TODO: Persist newName via API
    setEditingName(false)
  }

  const handleBioSave = () => {
    // TODO: Persist newBio via API
    setEditingBio(false)
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
                onBlur={handleNameSave}
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
                onBlur={handleBioSave}
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
