const Product = require("./models/Product");


app.get("/api/product", function(req, res){
    Product.find({}).then(dbModel => res.json(dbModel));
  });
app.post("/api/product",  function(req, res){
    Product.create(req.body).then(dbModel => res.json(dbModel));
  });