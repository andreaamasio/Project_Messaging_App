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
  const { receiverId } = req.params
  const senderId = req.user.id
  const messages = await db.findMessages(receiverId, senderId)

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

    const newMessage = await db.postNewMessage(senderId, receiverId, content)

    res.json({
      message: `The sender ${senderId} sent ${content} to ${receiverId}`,
      newMessage: newMessage,
    })
  },
]

module.exports = {
  getMessage,
  getAllMessages,
  postNewMessage,
  updateMessage,
  deleteMessage,
}
