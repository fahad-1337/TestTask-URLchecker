const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");






const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const urlSchema = new mongoose.Schema( {
    name: String,
    website: String
    
  });
  
  const Url = mongoose.model('Url', urlSchema);

app.get('/',function(req,res) {
    
    res.sendFile(__dirname + "/index.html");

  });


app.post("/", function(req, res){

 





  const url = {
    name: req.body.companyName,
    link: req.body.website


  };

  Url.findOne({ website: url.link }, function(err, foundCompany) {
  if(foundCompany) {
    console.log("found in db");
    res.redirect("/notaccepted")

  } else {

    const newUrl = new Url ({
      name: url.name,
      website: url.link
  
    })
  
    newUrl.save();
  
    
    



    console.log("not found in db");
    res.redirect("/accepted")
  }


  });

  

});


app.get('/accepted',function(req,res) {
    
  res.sendFile(__dirname + "/notfound.html");

});

app.get('/notaccepted',function(req,res) {
    
  res.sendFile(__dirname + "/found.html");

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
