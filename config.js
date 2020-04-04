const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://cluster0-xgyxi.mongodb.net/Sunny123")
        .then(()=> console.log("mongo connected"))
        .catch(err=> console.log(err));



