const mongoose = require("mongoose");

const Schema =mongoose.Schema;

let SongSchema= new Schema({
    title:{
        type:String,
        trim:true,
        required:"Songs must have title"
    },
    artist:{
        type:String,
        trim:true,
        required:"Songs must have an artist"
    },
    genre:{
        type:String,
        trim:true,
        default:"punk"
    },
    release_date:{
        type:Date,
        default:Date.now,
    },
})

const Song= mongoose.model("Song",SongSchema)
module.exports= Song;