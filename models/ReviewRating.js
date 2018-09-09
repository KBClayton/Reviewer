const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewRatingSchema = new Schema({
    parentReview: {type:Schema.Types.ObjectId, ref:'Review', required:true},
    user: {type:Schema.Types.ObjectId, ref:'User'},
    rating:{type: Number, min:-1, max:1},
})

const ReviewRating = mongoose.model("ReviewRating", ReviewRatingSchema);

module.exports = ReviewRating;