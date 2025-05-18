const { Router } = require("express")

const messageController = require("../controllers/messageController")
const userController = require("../controllers/userController")
const messageRouter = Router()

messageRouter.get(
  "/:receiverId",
  userController.authenticateToken, //check auth
  messageController.getAllMessages
)
messageRouter.get(
  "/:messageId",
  userController.authenticateToken,
  messageController.getMessage
)
messageRouter.put(
  "/:messageId",
  userController.authenticateToken,
  messageController.updateMessage
)
messageRouter.delete(
  "/:messageId",
  userController.authenticateToken,
  messageController.deleteMessage
)
messageRouter.post(
  "/",
  userController.authenticateToken,
  messageController.postNewMessage
)

module.exports = messageRouter
