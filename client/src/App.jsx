import React, { useEffect, useState } from "react"
import Navbar from "./components/NavBar"

import SignUpForm from "./components/SignUpForm"
import LoginForm from "./components/LoginForm"

import loginUser from "../loginUser"
import SideBar from "./components/SideBar"
import Chat from "./components/Chat"

const App = () => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [showRegister, setShowRegister] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3000/user/login", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Invalid token")
          return res.json()
        })
        .then((data) => {
          setUser(data.user)
          setToken(token)
        })
        .catch(() => {
          setUser(null)
          setToken(null)
          localStorage.removeItem("token")
        })
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    setSuccessMessage("")
    localStorage.removeItem("token")
  }
  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      {user ? (
        <>
          <div className="main-layout">
            <SideBar onUserSelect={(user) => setSelectedUser(user)} />
            {selectedUser && (
              <Chat
                currentUser={user}
                selectedUser={selectedUser}
                token={token}
              />
            )}
          </div>
        </>
      ) : showRegister ? (
        <>
          <SignUpForm onSuccess={() => setShowRegister(false)} />
          <p>
            Already have an account?{" "}
            <button onClick={() => setShowRegister(false)}>Log in</button>
          </p>
        </>
      ) : (
        <>
          <LoginForm
            onLogin={(userData, accessToken) => {
              console.log("✅ Logged in as:", userData)
              console.log("🔐 Token:", accessToken)
              setSuccessMessage(`Welcome back, ${userData.name}`)
              setUser(userData)
              setToken(accessToken)
              localStorage.setItem("token", accessToken)
              localStorage.setItem("user", JSON.stringify(userData))
            }}
          />
          <p>
            Don't have an account?{" "}
            <button onClick={() => setShowRegister(true)}>Register</button>
          </p>
        </>
      )}
    </div>
  )
}

export default App
