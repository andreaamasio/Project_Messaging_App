import React, { useState } from "react"
import registerUser from "../../registerUser"

const SignUpForm = ({ onSuccess }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      const data = await registerUser(email, password, name, bio)
      setSuccess("Account created! You can now log in.")
      onSuccess && onSuccess()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Register</h2>
      {error && <p className="red">{error}</p>}
      {success && <p className="green">{success}</p>}
      <label>
        <span>Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        <span>Short Bio (your today mood)</span>
        <input
          type="text"
          value={bio}
          name="bio"
          onChange={(e) => setBio(e.target.value)}
        />
      </label>
      <label>
        <span>Name</span>
        <input
          type="text"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Register</button>
    </form>
  )
}

export default SignUpForm
