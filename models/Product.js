const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const productSchema = new Schema({
  title: { type: String, required: true},
  description: { type: String, required: true},
  picture:{type:String, default:"https://via.placeholder.com/300x300"},
  link:{ type: String, default: "#" },
  address: {type: String, default: "301 W 2nd St, Austin, TX 78701"},
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  ratings:[{type:Schema.Types.ObjectId, ref:'ProductRating'}],
  averageRating:{type:Number, min:0, max:5, default:0, required:true},
  user: {type:Schema.Types.ObjectId, ref:'User', required:true},
  username:{type:String},
  catagories:{type: Array},
  gpsdata:{type: Object, default:{lat:30.2672, long:97.7431}},
  dateCreated:{type:Date, default:Date.now},
  dateUpdated:{type:Date, default:Date.now}
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
