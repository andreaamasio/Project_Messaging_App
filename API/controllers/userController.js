const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const db = require("../db/queries")
const jwt = require("jsonwebtoken")

const emptyErr = "cannot be empty."
const validateUser = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage(`Email: ${emptyErr}`)
    .isEmail()
    .withMessage(`Email: Please use a valid email address`)
    .normalizeEmail({ gmail_remove_dots: false })
    .custom(async (value) => {
      const existingUser = await db.findUserByEmail(value)
      if (existingUser) {
        throw new Error("Email already exists. Please choose another one.")
      }
    }),

  body("password").notEmpty().withMessage(`Password: ${emptyErr}`),
  // .isLength({ min: 8 })
  // .withMessage(`Password: Minimum 8 characters`)
  // .matches(/[A-Z]/)
  // .withMessage(`Password: Must contain at least one uppercase letter`)
  // .matches(/[0-9]/)
  // .withMessage(`Password: Must contain at least one number`)
  // .matches(/[\W_]/)
  // .withMessage(
  //   `Password: Must contain at least one special character (!@#$%^&*)`
  //),
]
const validateUpdateUser = [
  body("name").trim().notEmpty().withMessage(`Name: ${emptyErr}`),

  //body("avatarUrl").isURL().withMessage("Please use a valid URL for the avatar")
  // .isLength({ min: 8 })
  // .withMessage(`Password: Minimum 8 characters`)
  // .matches(/[A-Z]/)
  // .withMessage(`Password: Must contain at least one uppercase letter`)
  // .matches(/[0-9]/)
  // .withMessage(`Password: Must contain at least one number`)
  // .matches(/[\W_]/)
  // .withMessage(
  //   `Password: Must contain at least one special character (!@#$%^&*)`
  //),
]

const getSignUp = (req, res) => {
  res.json({ message: "this is the sign-up route" })
}
const postSignUp = [
  validateUser,

  async (req, res) => {
    console.log("Incoming body:", req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log("errors found")
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    const email = req.body.email
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const bio = req.body.bio
    const name = req.body.name
    const avatarUrl = req.body.avatarUrl

    await db.postNewUser(email, hashedPassword, bio, name, avatarUrl)

    res.json({
      message: `The user with email ${email} and password ${req.body.password}, hashed: ${hashedPassword} will be registered with prisma`,
    })
  },
]

const getLogin = (req, res) => {
  res.json({ message: "this is the login route" })
}

const getContacts = async (req, res) => {
  const users = await db.findContacts()
  if (!users) {
    return res.status(404).json({
      message: "Users not found",
    })
  }

  res.json({ data: users })
}
const postLogin = async (req, res) => {
  const user = await db.findUserByEmail(req.body.email)
  if (!user) {
    return res.status(404).json({
      message: "User not found, please sign up first",
    })
  }

  try {
    const match = await bcrypt.compare(req.body.password, user.password)
    if (match) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      })
      return res.json({
        message: `Hi ${user.email}, you successfully logged in.`,
        accessToken,
        user: {
          userId: user.id,
          email: user.email,
          name: user.name,
          bio: user.bio,
          updatedAt: user.updatedAt,
          createdAt: user.createdAt,
        },
      })
    } else {
      return res.status(401).json({
        message: "Incorrect password",
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error during password comparison",
    })
  }
}
const updateUser = [
  validateUpdateUser,
  async (req, res) => {
    console.log("Incoming body:", req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log("errors found")
      return res.status(400).json({
        errors: errors.array(),
      })
    }
    const userId = req.user.id
    console.log(`userId inside updateUser is ${userId}`)
    const name = req.body.name
    const newUser = await db.updateUser(userId, name)
    res.json({ newUser })
  },
]
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    }
    req.user = user
    next()
  })
}

module.exports = {
  getSignUp,
  postSignUp,
  getLogin,
  postLogin,
  authenticateToken,
  updateUser,
  getContacts,
}
