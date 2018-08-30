const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
  text: { type: String, required: true},
  parentReview: {type:Schema.Types.ObjectId, ref:'Review', required:true},
  upDown:{type:Number}
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;