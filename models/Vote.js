const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
    smartphone: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    }
});

const Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;