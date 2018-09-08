const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  text: { type: String, required: true},
  parentProduct: {type:Schema.Types.ObjectId, ref:'Product', required:true},
  user: {type:Schema.Types.ObjectId, ref:'User'},
  replies: [{type:Schema.Types.ObjectId, ref:'Reply'}],
  ratings:[{type:Schema.Types.ObjectId, ref:'ReviewRating'}],
  username:{type:String},
  dateCreated:{type:Date, default:Date.now},
  dateUpdated:{type:Date, default:Date.now}
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
