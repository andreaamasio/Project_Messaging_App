require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRouter = require("./routers/userRouter")
const messageRouter = require("./routers/messageRouter")
app.use("/user", userRouter)
app.use("/message", messageRouter)
app.get("/", (req, res) =>
  res.json({ message: "Welcome to Messaging App API" })
)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`)
})
