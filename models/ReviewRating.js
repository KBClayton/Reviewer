const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewRating = new Schema({
    parentReview: {type:Schema.Types.ObjectId, ref:'Review', required:true},
    user: {type:Schema.Types.ObjectId, ref:'User'},
    rating:{type: Number, min:0, max:5},
})

const ReviewRating = mongoose.model("ReviewRating", ReviewRating);

module.exports = ReviewRating;