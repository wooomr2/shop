const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const Message = require("../models/Message");

exports.addMessage = asyncHandler(async (req, res, next) => {
  const newMessage = new Message(req.body);
  const message = await newMessage.save();

  res.status(200).json(message);
});

exports.getMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({
    chatroom: req.params.chatroomId,
  });

  res.status(200).json(messages);
});
