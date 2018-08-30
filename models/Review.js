const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  text: { type: String, required: true},
  parentProduct: {type:Schema.Types.ObjectId, ref:'Product', required:true},
  rating:{type: Number}
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
