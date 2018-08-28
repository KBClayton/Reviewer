const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
  text: { type: String, required: true},
  parentProduct: {type:Schema.Types.ObjectId, ref:'Review'},
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;