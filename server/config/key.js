



if (process.env.NODE_ENV === 'production') {


    module.exports = {
        mongoURI:process.env.MONGO_URI
    }
  //  module.exports = require('./prod');
 } else {
   // module.exports = require('./dev');\
   module.exports={
    // mongoURI:"mongodb://localhost:27017/chitChat"
//    mongoURI:"mongodb+srv://mongodb01-uxbai.mongodb.net/test"  
//    mongo "mongodb+srv://mongodb01-uxbai.mongodb.net/test"  --username taniaijaz
// mongoURI: `mongodb+srv://tania:${encodeURIComponent('taniaijaz')}@mongodb01.net/testDB`
// mongoURI:`mongodb+srv://tania:taniaijaz@cluster0-hew4n.mongodb.net/test?retryWrites=true&w=majority`
// mongoURI:`mongodb+srv://tania:${encodeURIComponent('taniaijaz')}@mlab-aglum.mongodb.net/ChitChat`
mongoURI:`mongodb+srv://tania:taniaijaz@mongodb01-uxbai.mongodb.net/ChitChat`


}
 }

