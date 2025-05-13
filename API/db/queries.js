const { PrismaClient } = require("@prisma/client")
//const prisma = new PrismaClient()
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
})
async function findUserByEmail(email) {
  console.log("Looking for user with email:", email)
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (user) {
      console.log(`User found: ${email}`)
    } else {
      console.log(`User not found: ${email}`)
    }

    return user
  } catch (error) {
    console.error(`Error finding user by email (${email}):`, error)
    throw error
  }
}

async function findUserById(id) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (user) {
      console.log(`User found by ID: ${id}`)
    } else {
      console.log(`User not found by ID: ${id}`)
    }

    return user
  } catch (error) {
    console.error(`Error finding user by ID (${id}):`, error)
    throw error
  }
}
async function postNewUser(email, hashedPassword, bio, name, avatarUrl) {
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        bio,
        name,
        avatarUrl,
      },
    })

    console.log(`User successfully created: ${email}`)
    return newUser
  } catch (error) {
    console.error(`Error creating new user (${email}):`, error)
    throw error
  }
}

async function postNewMessage(text, createdById, postId) {
  try {
    const newComment = await prisma.message.create({
      data: {
        text,
        createdById,
        postId,
      },
    })

    console.log(`Message successfully created: ${text}`)
    return newComment
  } catch (error) {
    console.error(`Error creating new message (${text}):`, error)
    throw error
  }
}

async function deleteMessage(messageId) {
  try {
    const deletedPost = await prisma.message.delete({
      where: {
        id: messageId,
      },
    })

    console.log(`Deleted message: ${messageId}`)
    return deletedPost
  } catch (error) {
    console.error(`Error deleting post (${messageId}):`, error)
    throw error
  }
}
async function findMessageById(id) {
  return await prisma.message.findUnique({ where: { id } })
}
module.exports = {
  findUserByEmail,
  findUserById,
  postNewUser,
  deleteMessage,
  findMessageById,
  postNewMessage,
}
