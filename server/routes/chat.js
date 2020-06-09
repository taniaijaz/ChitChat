const express = require('express');

const router = express.Router();
const { Chat } = require("../models/Chat");
// var chat=mongooes.model('chat',Schema)

// const { auth } = require("../middleware/auth");
//to get chat data from chat model
router.get("/getChats",async (req, res) => {

 await Chat.find()
.populate("sender")
//  console.log('getting data')
  .exec((err,chats)=>{
    if(err) return res.status(400).send(err)
    else{
      console.log(chats)
     res.status(200).send(chats)
    }
 })





// try{
//       await Chat.find()
//         // console.log('ok doing well')
//     .populate('sender')
//     // console.log(chat)
//     res.status(200).send(chats);
    
    
// }

// catch(ex){
//     console.log(ex)

//   }
});

module.exports = router;