const { Router } = require("express")

const messageController = require("../controllers/messageController")
const messageRouter = Router()

messageRouter.get("/", messageController.getAllMessages)
messageRouter.get("/:messageId", messageController.getMessage)
messageRouter.put("/:messageId", messageController.updateMessage)
messageRouter.delete("/:messageId", messageController.deleteMessage)
messageRouter.post("/", messageController.postNewMessage)
messageRouter.get(
  "/check-auth",
  userController.authenticateToken,
  (req, res) => {
    res.json({ user: req.user })
  }
)

module.exports = userRouter
