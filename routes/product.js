const Product = require("../models/Product");
const mongoose = require("mongoose");
const User = require("../models/User");
const Review = require("../models/Review");
const Reply= require("../models/Reply");

module.exports = function(app) {

  app.get("/api/product", function(req, res){
    //console.log(req.body);
   // console.log(vault.read(req));
      Product.find({}).sort({'dateCreated': 1}).then(dbModel => res.json(dbModel));
  });

  app.get("/api/product/:id", function(req, res){
   // console.log(req.body);
      Product.findOne({_id:req.params.id})
      .populate({path:'reviews',
      populate: { path: 'replies' }
    })
      //.populate('replies')
      .exec( function(err, dbreply) {
       // console.log(dbreply);
        if (err) {res.json(err)};
          res.json(dbreply);
      });
      //.then(dbModel => res.json(dbModel));
  });

  app.post("/api/product",  function(req, res){
      //console.log(req.body);
     // console.log(req.session.uid);
      newreq.body
      Product.create(req.body).then(dbModel => {
        //update user
        User.findByIdAndUpdate(req.session.uid, { "$push": { "products": dbModel._id } },
        { "new": true, "upsert": true }).then(dbreply=> {
          console.log(dbreply);
          res.json(dbModel);
        });
        //res.json(dbModel)
      });
  });

  app.post("/api/product/search/:query", function(req, res){
    var re = new RegExp(req.params.query, 'i');
    Product.find().or([{ 'description': { $regex: re }}, { 'title': { $regex: re }}, { 'catagories': { $regex: re }}]).sort({'dateCreated': 1}).exec(function(err, users) {
      res.json(JSON.stringify(users));
  });
  });

  app.get("/api/product/bad", function(req, res){
    Product.find().populate.then((dbreply, err)=>{
      if(err){
        console.log(err);
        res.json({sucess:false, message:"failed"})
      }else{
        res.json(dbreply)
      }
    })
  });

  app.delete("/api/product/:id", function(req, res){
    Product.deleteOne({id:req.params.id}).then(dbreply=>{
      res.json(dbreply)
    })
  })


}