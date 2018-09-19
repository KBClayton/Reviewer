const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recommendSchema = new Schema ({
  title: { type: String, required: true},
  description: { type: String},
  location: { type: String},
  address: { type: String},
  time: { type: String},
  image: { type:String, default: "https://via.placeholder.com/300x300"},
  link: { type: String, default: "https://via.placeholder.com" },
  ticketLink: { type: String, default: "" },
  lat: { type: String, default: "" },
  long: { type: String, default: "" },
  storeName: {type: String, default: ""},
  do512: { type: Boolean, required: true, default: false},
  food: { type: Boolean, required: true, default: false},
  music: { type: Boolean, required: true, default: false},
  books: { type: Boolean, required: true, default: false },
  obscura: { type: Boolean, required: true, default: false},
  obscuraP1: { type: Boolean, required: true, default: false},
  obscuraP2: { type: Boolean, required: true, default: false},
  outdoor: { type: Boolean, required: true, default: false},
  artsEvent: { type: Boolean, required: true, default: false},
})

const Recommend = mongoose.model("Recommend", recommendSchema);

module.exports = Recommend;
