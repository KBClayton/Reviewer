const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
require('mongoose-type-email');

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true, minlength:8,
    // validate: {
    //   validator: function(v) {
    //     if(v.search(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g)){
    //       return true;
    //     }else{
    //      return false};
    //   },
    //   message: props => `password is insufficently complex`
    // }, 
  },
  roles:{type:Array, default:["user"]},
  picture:{type:String, default:"https://via.placeholder.com/200x200"},
  email:{type:mongoose.SchemaTypes.Email, required:true, unique:true},
  emailVerified:{type:Boolean, default:false},
  passwordReset:{type:Date, default:Date.now},
  averageRating:{type:Number},
  emailVerifyKey:{type:String},
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
  productRatings:[{ type: Schema.Types.ObjectId, ref: 'ProductRating' }],
  reviewRatings:[{ type: Schema.Types.ObjectId, ref: 'ReviewRating' }]
});

UserSchema.pre('save', function(next){
  if(this.isModified('password') || this.isNew){
    // hash the password
    bcrypt.hash(this.password, 10, (err, hash) => {
      if(err){ return next(err); }
      this.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function(pass, cb){
  bcrypt.compare(pass, this.password, (err, isMatch) => {
    if(err){ return cb(err); }
    cb(null, isMatch);
  });
}

const User = mongoose.model("User", UserSchema);
//exports.User=User;
module.exports = User;
//export default User;
//exports.User=User;
