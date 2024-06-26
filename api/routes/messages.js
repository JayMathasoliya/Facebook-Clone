const Message = require("../models/Message");
const express = require("express");
const router = express.Router();

// Add Messages

router.post("/", async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get Messages
router.get("/:conversationId", async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        })
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;