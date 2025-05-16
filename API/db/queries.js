const { PrismaClient } = require("@prisma/client")
//const prisma = new PrismaClient()
const prisma = new PrismaClient()
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
async function findMessageById(messageId) {
  try {
    const message = await prisma.message.findUnique({
      where: { messageId },
    })

    if (message) {
      console.log(`Message found by ID: ${messageId}`)
    } else {
      console.log(`Message not found by ID: ${messageId}`)
    }

    return message
  } catch (error) {
    console.error(`Error finding message by ID (${messageId}):`, error)
    throw error
  }
}

async function updateMessage(messageId, newContent) {
  try {
    const updateMessage = await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        content: newContent,
      },
    })

    if (updateMessage) {
      console.log(`Message by ID: ${messageId} updated with ${newContent}`)
    } else {
      console.log(`error updating message: ${messageId}`)
    }

    return updateMessage
  } catch (error) {
    console.error(`Error updating message by ID (${messageId}):`, error)
    throw error
  }
}
async function findMessages(userId) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
          },
          {
            receiverId: userId,
          },
        ],
      },
    })

    if (messages) {
      console.log(`Messages found: ${messages}`)
    } else {
      console.log(`Messages not found`)
    }

    return messages
  } catch (error) {
    console.error(`Error finding messages`, error)
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

async function postNewMessage(senderId, receiverId, content) {
  try {
    const newMessage = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    })

    console.log(`Message successfully created: ${content}`)
    return newMessage
  } catch (error) {
    console.error(`Error creating new message (${content}):`, error)
    throw error
  }
}

async function deleteMessageById(messageId) {
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
// async function findMessageById(id) {
//   return await prisma.message.findUnique({ where: { id } })
// }
module.exports = {
  findUserByEmail,
  findUserById,
  postNewUser,
  deleteMessageById,
  findMessageById,
  postNewMessage,
  findMessages,
  updateMessage,
}
