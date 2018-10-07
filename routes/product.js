const Product = require("../models/Product");
const mongoose = require("mongoose");
const User = require("../models/User");
const Review = require("../models/Review");
const Reply= require("../models/Reply");
const verify=require("./verify");

module.exports = function(app) {

  app.get("/api/product", function(req, res){
    //console.log(req.body);
   // console.log(vault.read(req));
  

      Product.find({expires:{'$lte' : Date.now}}).sort({'dateCreated': -1}).populate('ratings').then((dbModel, err) =>{ 
        if(err){
          console.log(err);
          res.status(500).send({success:false, message:"something went wrong"})
        }
        res.json(dbModel)});


  });
  app.get("/api/productiter/:page", function(req, res){
    //console.log(req.body);
   // console.log(vault.read(req));
  

      Product.find({}).sort({'dateCreated': -1}).skip(20*req.params.page).limit(20).populate('ratings').then((dbModel, err) =>{ 
        if(err){
          console.log(err);
          res.status(500).send({success:false, message:"something went wrong"})
        }
        res.json(dbModel)});


  });

  app.get("/api/productpop", function(req, res){
    //console.log(req.body);
   // console.log(vault.read(req));
      Product.find({}).sort({'averageRating': -1}).populate('ratings').then((dbModel, err )=>{ 
        if(err){
          console.log(err);
          res.status(500).send({success:false, message:"something went wrong"})
        }
        res.json(dbModel)});
  });

  app.get("/api/product/:id", function(req, res){
   // console.log(req.body);
      Product.findOne({_id:req.params.id})
      .populate({path:'reviews', options: { sort: { 'dateCreated': -1 } },
      populate: { path: 'replies' },
      populate: {path:'ratings'}
    })
    .populate("ratings")
      //.populate('replies')
      .exec( function(err, dbreply) {
       // console.log(dbreply);
        if (err) {res.json(err)};
          res.json(dbreply);
      });
      //.then(dbModel => res.json(dbModel));
  });

  app.post("/api/product", async function(req, res){
    if(!await verify.loggedin(req)){
      console.log("failed validation")
      res.status(401).send({success: false, message: "you are not logged in"});
      return;
    }
      //console.log("in new product")
      //console.log(req.body)
    let piclink
     if(req.body.picture===''){
        piclink=undefined;
      }else{
        piclink=req.body.picture;
        if(piclink.substring(0,5)!=='http:' && piclink.substring(0,6)!=='https:'){
          piclink="https://"+piclink;

          //console.log("picture pre regex")
          //console.log(piclink)
        }
        if(!piclink.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g)){
         // console.log("picture in regex if")
          piclink=undefined;
        }
      }
      let link
      if(req.body.link===''){
        link=undefined;
      }else{
        link=req.body.link;
        //console.log(link.substring(0,4))
        if(link.substring(0,5)!=='http:' && link.substring(0,6)!=='https:'){
          link="https://"+link;

          //console.log("link pre regex")
          //console.log(link)
        }
        if(!link.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g)){
          //console.log("link  in regex if")
          link=undefined;
        }
      }
      //console.log(picklink)
      //console.log(link)
      newprod={
        title:req.body.title,
        description:req.body.description,
        picture:piclink,
        link:link,
        address:req.body.address,
        averageRating:undefined,
        gpsdata:req.body.gpsdata,
        dateCreated:undefined,
        dateUpdated:undefined,
        averageRating:undefined

      };
      newprod.user=req.session.uid;
      newprod.username=req.session.username;
      Product.create(newprod).then(dbModel => {
        //update user
        User.findByIdAndUpdate(req.session.uid, { "$push": { "products": dbModel._id } },
        { "new": true, "upsert": true }).then(dbreply=> {
          //console.log(dbreply);
          //console.log(logger);
          res.json(dbModel);
        });
        //res.json(dbModel)
      });
  });

  app.post("/api/product/search/:query", function(req, res){
    var re = new RegExp(req.params.query, 'i');
    Product.find().or([{ 'description': { $regex: re }}, { 'title': { $regex: re }}, { 'catagories': { $regex: re }}]).sort({'dateCreated': 1}).exec(function(err, users) {
      res.json(users);
  });
  });

  app.post("/api/product/searchpages/:query/:page", function(req, res){
    var re = new RegExp(req.params.query, 'i');
    Product.find().or([{ 'description': { $regex: re }}, { 'title': { $regex: re }}, { 'catagories': { $regex: re }}]).sort({'dateCreated': 1}).skip(20*req.params.page).limit(20).exec(function(err, users) {
      res.json(users);
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

  app.delete("/api/product/:id", async function(req, res){
    if(!await verify.loggedin(req)){
      console.log("failed validation")
      res.status(401).send({success: false, message: "you are not logged in"});
      return;
    }
    Product.deleteOne({id:req.params.id}).then(dbreply=>{
      res.json(dbreply)
    })
  })


}