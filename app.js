var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Truck = require("./models/trucks");
var Comment = require("./models/comment");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

// mongodb+srv://sdwqdwd5:vul3ejo3@trucker.vct86.mongodb.net/trucker?retryWrites=true&w=majority


url = process.env.DATABASEURL || "mongodb://localhost:27017/trucker";
mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true});
app.set("view engine", "ejs");
app.get("/", function(req,res){
	res.render("landing");
});
// var trucks = [
// 		{name: "Truck with Crane", image: "https://i.ibb.co/grP13Wb/truck-with-crane.jpg", description:"HI"},
// 		{name: "Truck with Rock", image: "https://i.ibb.co/D4HLWMp/truck-with-rock.jpg", description:"HI"},
// 		{name: "Truck with excavator", image:"https://i.ibb.co/cy0P8X8/trucks-with-excavator.jpg", description:"HI"}
// 	]


app.get("/trucks", function(req,res){
	Truck.find({}, function(err, allTrucks){
		if(err){
			console.log(err);
		}else{
			// var newComment = {author:"PETER", text:"AOAOOAOAOAOAOAOAO"}
			// Comment.create(newComment, function(err, newlyComment){
			// 	if(err){
			// 		console.log(err)
			// 	}else{
			// 		allTrucks.forEach(function(truck){
			// 			truck.comments.push(newlyComment);
			// 			truck.save();
			// 		})
			// 	}
			// })
			console.log(allTrucks);
			res.render("index", {trucks:allTrucks});		
		}
	})
});
app.get("/trucks/new", function(req,res){
	res.render("new");
});

app.get("/trucks/:id", function(req,res){
	Truck.findById(req.params.id).populate("comments").exec( function(err, foundTruck){
		if (err){
			console.log(err)
		}else{
			res.render("show", {truck: foundTruck});
		}
	});
});
app.post("/trucks", function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newTruck = {name:name, image:image, description:description};
	Truck.create(newTruck, function(err, newlyCreateTruck){
		if(err){
			console.log(err);
		}else{
			res.redirect("/trucks");	
		}
	})
	
	
});
app.listen(process.env.PORT||3000,function(){
	console.log("server!!!!!!");
});