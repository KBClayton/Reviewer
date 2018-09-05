const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  text: { type: String, required: true},
  userid: {type:Schema.Types.ObjectId, ref:'User', required:true},
  dateCreated:{type:Date, default:Date.now},
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;