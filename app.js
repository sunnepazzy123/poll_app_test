const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");


// require("./config");
mongoose.Promise = global.Promise;

// mongoose.connect("mongodb://localhost:27017/pollApp", {useUnifiedTopology: true, useNewUrlParser: true }).then((db)=>{
//     console.log("MONGO CONNECTED");
// }).catch(error=> console.log("COULD NOT CONNECT => " + error));



mongoose.connect("mongodb+srv://sunnepazzy_20:sunnepazzy_20@cluster0-xgyxi.mongodb.net/test?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true })
        .then(()=> console.log("mongo connected"))
        .catch(err=> console.log(err));

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://<username>:<password>@cluster0-xgyxi.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



const app = express();

const poll = require("./routes/poll");

//set public folder

app.use(express.static(path.join(__dirname, "public")));

//body parser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//enable cors
app.use(cors());

app.use("/poll", poll);

const port = 4000;

app.listen(port, ()=>console.log(`server is listening on ${port}`))