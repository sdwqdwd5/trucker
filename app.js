var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.get("/", function(req,res){
	res.render("landing");
});
var trucks = [
		{name: "Truck with Crane", image: "https://i.ibb.co/grP13Wb/truck-with-crane.jpg"},
		{name: "Truck with Rock", image: "https://i.ibb.co/D4HLWMp/truck-with-rock.jpg"},
		{name: "Truck with excavator", image:"https://i.ibb.co/cy0P8X8/trucks-with-excavator.jpg"}
	]
app.get("/trucks", function(req,res){

	res.render("trucks", {trucks:trucks});
});
app.get("/trucks/new", function(req,res){
	res.render("new");
});
app.post("/trucks", function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	trucks.push({name:name, image:image});
	res.redirect("/trucks");
	
});
app.listen(process.env.PORT||3000,function(){
	console.log("server!!!!!!");
});