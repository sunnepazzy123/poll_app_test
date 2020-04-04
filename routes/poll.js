const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Vote = require("../models/Vote");

const Pusher = require("pusher");

var pusher = new Pusher({
    appId: '975763',
    key: '8094042d1c4c607cfccd',
    secret: '303174023988ac128d03',
    cluster: 'eu',
    // encrypted: true
  });

router.get("/", (req, res)=>{
    // res.send("poll");
    Vote.find().then(votes=>{
      res.json({success: true, votes: votes});
    });
});


router.post("/", (req, res)=>{
    // res.send("poll");
    const newVote = {
      smartphone: req.body.smartphone,
      points: 1
    }

    new Vote(newVote).save().then(vote=>{
      pusher.trigger('smartphone', 'smartphone-vote', {
        points: parseInt(vote.points),
        smartphone: vote.smartphone
      });

      return res.json({success:true, message: "Thank you for voting"});


    });


   

});

module.exports = router;