const { Router } = require("express")

const messageController = require("../controllers/messageController")
const userController = require("../controllers/userController")
const messageRouter = Router()

messageRouter.get(
  "/",
  userController.authenticateToken, //check auth
  messageController.getAllMessages
)
messageRouter.get(
  "/:messageId",
  userController.authenticateToken,
  messageController.getMessage
)
// messageRouter.put("/:messageId", messageController.updateMessage)
// messageRouter.delete("/:messageId", messageController.deleteMessage)
// messageRouter.post("/", messageController.postNewMessage)
// messageRouter.get(
//   "/check-auth",
//   userController.authenticateToken,
//   (req, res) => {
//     res.json({ user: req.user })
//   }
// )

module.exports = messageRouter
