const mongoose = require("mongoose");

const Schema =mongoose.Schema;

let AlbumSchema= new Schema({
    title:{
        type:String,
        trim:true,
        required:"Albums must have a name"
    },
    artist:{
        type:String,
        trim:true,
        required:"Albums must have at least one artist"
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
    songs:[{
        type:Schema.Types.ObjectId,
        ref:"Song"
    }]
})

const Album= mongoose.model("Album",AlbumSchema)
module.exports= Album;