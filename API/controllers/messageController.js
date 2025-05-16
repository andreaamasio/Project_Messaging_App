const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const db = require("../db/queries")

const jwt = require("jsonwebtoken")

const emptyErr = "cannot be empty."
const validateMessage = [
  body("content").trim().notEmpty().withMessage(`Content: ${emptyErr}`),
]

const getMessage = async (req, res) => {
  const { messageId } = req.params
  const message = await db.findMessageById(messageId)
  res.json({ message })
}

const deleteMessage = async (req, res) => {
  const { messageId } = req.params
  const message = await db.deleteMessageById(messageId)
  res.json({ message })
}
const updateMessage = [
  validateMessage,
  async (req, res) => {
    console.log("Incoming body:", req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log("errors found")
      return res.status(400).json({
        errors: errors.array(),
      })
    }
    const { messageId } = req.params
    const content = req.body.content
    const newMessage = await db.updateMessage(messageId, content)
    res.json({ newMessage })
  },
]
const getAllMessages = async (req, res) => {
  const userId = req.user.id
  const messages = await db.findMessages(userId)

  res.json({ messages })
}

const postNewMessage = [
  validateMessage,

  async (req, res) => {
    console.log("Incoming body:", req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log("errors found")
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    const senderId = req.user.id
    const content = req.body.content
    const receiverId = req.body.receiverId

    await db.postNewMessage(senderId, receiverId, content)

    res.json({
      message: `The sender ${senderId} sent ${content} to ${receiverId}`,
    })
  },
]

// const getLogin = (req, res) => {
//   res.json({ message: "this is the login route" })
// }
// const postLogin = async (req, res) => {
//   const user = await db.findUserByEmail(req.body.email)
//   if (!user) {
//     return res.status(404).json({
//       message: "User not found, please sign up first",
//     })
//   }

//   try {
//     const match = await bcrypt.compare(req.body.password, user.password)
//     if (match) {
//       const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: "1h",
//       })
//       return res.json({
//         message: `Hi ${user.email}, you successfully logged in.`,
//         accessToken,
//         userId: user.id,
//         email: user.email,
//       })
//     } else {
//       return res.status(401).json({
//         message: "Incorrect password",
//       })
//     }
//   } catch (err) {
//     return res.status(500).json({
//       message: "Error during password comparison",
//     })
//   }
// }

module.exports = {
  getMessage,
  getAllMessages,
  postNewMessage,
  updateMessage,
  deleteMessage,
}
