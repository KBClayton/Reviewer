const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recommendSchema = new Schema ({
  title: {type: String, required: true},
  description: { type: String},
  location: {type: String},
  time: {type: String},
  image:{type:String, default:"https://via.placeholder.com/300x300"},
  link:{ type: String, default: "https://via.placeholder.com" },
  do512: {type: Boolean, required: true, default: false},
  food: {type: Boolean, required:true, default: false},
  music: {type: Boolean, required: true, default: false}
})

const Recommend = mongoose.model("Recommend", recommendSchema);

module.exports = Recommend;
