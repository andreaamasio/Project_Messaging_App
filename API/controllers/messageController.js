const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const db = require("../db/queries")

const jwt = require("jsonwebtoken")

const emptyErr = "cannot be empty."
const validateMessage = [
  body("content").trim().notEmpty().withMessage(`Content: ${emptyErr}`),
]

const getMessage = async (req, res) => {
  const message = await db.findMessageById(req.body.messageId)
  res.json({ message })
}
const getAllMessages = async (req, res) => {
  const userId = req.user.id
  const messages = await db.findMessages(userId)

  res.json({ messages })
}

//correct below
// const postSignUp = [
//   validateUser,

//   async (req, res) => {
//     console.log("Incoming body:", req.body)
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       console.log("errors found")
//       return res.status(400).json({
//         errors: errors.array(),
//       })
//     }

//     const email = req.body.email
//     const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     const bio = req.body.bio
//     const name = req.body.name
//     const avatarUrl = req.body.avatarUrl

//     await db.postNewUser(email, hashedPassword, bio, name, avatarUrl)

//     res.json({
//       message: `The user with email ${email} and password ${req.body.password}, hashed: ${hashedPassword} will be registered with prisma`,
//     })
//   },
// ]

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
}
