const express = require("express");
const app = express();
const path = require("path");
//to communicate b/w backend and front end we enable this bcz ports are different
const cors = require('cors')

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const server=require("http").createServer(app);//creayting server
const io=require('socket.io')(server);

const config = require("./config/key");
// const exphbr= require('express-handlebar');
const nodemailer= require('nodemailer');
 const users=require("./models/User");
const {Chat} =require ("./models/Chat")


const mongoose = require("mongoose");
const dbc =require("./config/key").mongoURI;
  mongoose
  .connect(dbc, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Database Connection Established!"))
  .catch(err => console.log(err));
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

// const { Chat } = require("./models/Chat");
const { auth } = require("./middleware/auth");

app.use('/api/users', require('./routes/users'));
app.use('/api/chat', require('./routes/chat'));
// app.use('/api/chat', require('.routes/forgot'));



const multer = require("multer");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  // fileFilter: (req, file, cb) => {
  //   const ext = path.extname(file.originalname)
  //   if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
  //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
  //   }
  //   cb(null, true)
  // }
})
 
var upload = multer({ storage: storage }).single("file")

app.post("/api/chat/uploadfiles", auth ,(req, res) => {
  upload(req, res, err => {
    if(err) {
      return res.json({ success: false, err })
    }
    return res.json({ success: true, url: res.req.file.path });
  })
});
//getting data comming from client and saving to mongo
io.on("connection",socket=>{
  socket.on("Input Chat Message",async msg=>{
    // connect.then(dbc=>{
      try{
        let chat = await Chat.create({message :msg.chatMessage , sender:msg.userId, type:msg.type})
        // let chat =new Chat({ message :msg.chatMessage , sender:msg.userId, type:msg.type})

        if (chat) {
          chat   = await Chat.find({ "_id" : chat._id})
  .populate("sender");
          if (chat) { console.log(chat); return io.emit("Output Chat Message", chat) }//sending back to client

        }
/*
        chat.save((err,doc)=>{
  if(err)return res.json({success:false,err}) //if error in saving data into database then get json file format

  Chat.find({ "_id" : doc._id})
  .populate("sender")
  .exec((err,doc)=>{
    if (err) {console.log('error is on line 91')};
    return io.emit("Outpu Chat Message", doc) //sending back to client
  })

})*/
      }catch(ex){
        console.log(ex)

      }
    // })
  })
})




//use this to show the image you have in node js server to client (react js)
//
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server Running at ${port}`)
});