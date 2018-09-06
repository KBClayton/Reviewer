const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
  text: { type: String, required: true},
  parentReview: {type:Schema.Types.ObjectId, ref:'Review', required:true},
  user: {type:Schema.Types.ObjectId, ref:'User'},
  upDown:{type:Number},
  dateCreated:{type:Date, default:Date.now},
  dateUpdated:{type:Date, default:Date.now}
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;