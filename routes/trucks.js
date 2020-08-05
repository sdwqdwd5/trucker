var express = require("express");
var router = express.Router();
var Truck = require("../models/truck");

router.get("/", function(req,res){
	Truck.find({}, function(err, allTrucks){
		if(err){
			console.log(err);
		}else{
			console.log(allTrucks);
			res.render("trucks/index", {trucks:allTrucks});		
		}
	})
});
router.get("/new",isLoggedIn, function(req,res){
	res.render("trucks/new");
});

router.get("/:id", function(req,res){
	Truck.findById(req.params.id).populate("comments").exec( function(err, foundTruck){
		if (err){
			console.log(err)
		}else{
			res.render("trucks/show", {truck: foundTruck});
		}
	});
});
router.post("/",isLoggedIn, function(req,res){
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
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;