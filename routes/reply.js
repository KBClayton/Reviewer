const Reply= require("../models/Reply");
const mongoose = require("mongoose");
const User = require("../models/User");
const Review = require("../models/Review");

module.exports = function(app) {

  app.get("/api/reply/", function(req, res){
     // console.log(req.body);
     // console.log(vault.read(req));
      Reply.find({}).then(dbModel => res.json(dbModel));
  });

  app.get("/api/reply/:id", function(req, res){
    //console.log(req.body);
    Reply.findOne({id:req.params.id}).then(dbModel => res.json(dbModel));
  });
  
  app.post("/api/reply",  function(req, res){
      //console.log(req.body);
      //console.log(req.session.uid);
      Reply.create(req.body).then(dbModel => {
       // //update user
        User.findByIdAndUpdate(req.session.uid, { "$push": { "replies": dbModel._id } },
        { "new": true, "upsert": true }).then(dbreply=> {
          //console.log(dbreply)
                  //update review 
          Review.findByIdAndUpdate(req.body.parentReview, { "$push": { "replies": dbModel._id } },
          { "new": true, "upsert": true }).then(dbreply=> {
            //console.log(dbreply)
            res.json(dbModel);
          });
        });

        //res.json(dbModel)
      });
  });
  app.post("/api/reply/search/:query", function(req, res){
    var re = new RegExp(req.params.query, 'i');
    Reply.find().or([{ 'description': { $regex: re }}, { 'title': { $regex: re }}, { 'catagories': { $regex: re }}]).sort({'dateCreated': 1}).exec(function(err, users) {
      res.json(JSON.stringify(users));
  });
  });

  app.delete("/api/reply/:id", function(req, res){
    Reply.deleteOne({id:req.params.id}).then(dbreply=>{
      res.json(dbreply)
    })
  })

  

}