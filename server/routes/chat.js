const express = require('express');

const router = express.Router();
const { Chat } = require("../models/Chat");

// const { auth } = require("../middleware/auth");
//to get chat data from chat model
router.get("/getChats",async (req, res) => {
await Chat.find()
.populate("sender")
.exec((err,chats)=>{
    if(err) return res.status(400).send(err)
    res.status(200).send(chats)
})



});

module.exports = router;