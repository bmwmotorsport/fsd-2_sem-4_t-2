var express = require("express");
var app = express();

app.get("/",function(req,res){
    res.set("content-type","text/plain");
    res.send("Hello Express")
});

app.listen(8606);