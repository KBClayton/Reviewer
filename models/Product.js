const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true},
  description: { type: String, required: true},
  picture:{type:String, default:"https://via.placeholder.com/300x300"},
  link:{ type: String, default: "https://via.placeholder.com" },
  address: {type: String, default: "301 W 2nd St, Austin, TX 78701"},
  gpsdata:{type: Array, default:[lat:30.2672, long:97.7431]},
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
