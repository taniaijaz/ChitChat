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

const {Chat}=require("./models/Chat")
// const confi = require("./config/dev");

// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log("DB connected"))
//   .catch(err => console.error(err));

const mongoose = require("mongoose");
// const connect = mongoose.connect(config.mongoURI,
//   {
//     useNewUrlParser: true, useUnifiedTopology: true,
//     useCreateIndex: true, useFindAndModify: false
//   })
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err));
  mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
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

app.use('/api/users', require('./routes/users'));
app.use('/api/chat', require('./routes/chat'));


//getting data comming from client and saving to mongo
io.on("connection",socket=>{
  socket.on("Input Chat Messege",msg=>{
    connect.then(db=>{
      try{
let chat =new Chat({ message :msg.chatMessage , sender:msg.userId,type:msg.type})

chat.save((err,doc)=>{
  if(err)return res.json({success:false,err})

  Chat.find({ "_id" : doc._id})
  .populate("sender")
  .exec((err,doc)=>{
    return io.emit("Outpu Chat Message", doc)
  })
})
      }catch{error}{
        console.error(error)

      }
    })
  })
})




//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
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