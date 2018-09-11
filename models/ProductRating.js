const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductRatingSchema = new Schema({
    parentProduct: {type:Schema.Types.ObjectId, ref:'Product', required:true},
    user: {type:Schema.Types.ObjectId, ref:'User'},
    rating:{type: Number, min:0, max:5},
})

const ProductRating = mongoose.model("ProductRating", ProductRatingSchema);

module.exports = ProductRating;