const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/wetakk", {
  keepAlive: true
});


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://user:user@wetakk-xzesv.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


module.exports.User = require("./user");
module.exports.Message = require("./message");
