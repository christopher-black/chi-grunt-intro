//General Modules
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

//Set the port
app.set("port", (process.env.PORT || 5000));

//Middleware hookups
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./server/public/"));

//Routes
app.get("/", function(req,res){
  res.sendFile(path.resolve("server/public/views/index.html"));
});

//Listen
app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});
