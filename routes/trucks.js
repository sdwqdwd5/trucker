var express = require("express");
var router = express.Router();
var Truck = require("../models/truck");
var middlewareObj = require("../middleware")

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

router.get("/new",middlewareObj.isLoggedIn, function(req,res){
	res.render("trucks/new");
});

router.get("/:id", function(req,res){
	
		Truck.findById(req.params.id).populate("comments").exec( function(err, foundTruck){
			if (err){
				req.flash("error","Cannot show trucks");
				console.log(err)
			}else{
				res.render("trucks/show", {truck: foundTruck});
			}
		});
	
});
router.post("/",middlewareObj.isLoggedIn, function(req,res){
	var name = req.body.name;
	var image = req.body.image;
    var description = req.body.description;
    var author ={
		id: req.user._id,
		username: req.user.username
	}
	var newTruck = {name:name, image:image, description:description, author:author};
	Truck.create(newTruck, function(err, newlyCreateTruck){
		if(err){
			req.flash("error","Cannot creat a new truck");
			console.log(err);
		}else{
			req.flash("success", "A new truck created!");
			res.redirect("/trucks");	
		}
	})	
});
router.get("/:id/edit",middlewareObj.checkTruckUser,function(req,res){
	
	Truck.findById(req.params.id,function(err,foundTruck){
		if(err){
			req.flash("error", "Cannot find id:" + req.params.id +"truck");
			res.redirect("/trucks")
		}else{
			res.render("trucks/edit", {truck: foundTruck});
		}
	})
})

router.put("/:id",middlewareObj.checkTruckUser, function(req,res){

Truck.findByIdAndUpdate(req.params.id, req.body.truck, function(err, updatedTruck){
	if(err){
		req.flash("error", "Cannot find id:" + req.params.id +"truck");
		res.redirect("/trucks")
	}else{
		req.flash("success", "Truck updated!");
		res.redirect("/trucks/" + req.params.id);
	}
} )
})

router.delete("/:id",middlewareObj.checkTruckUser, function(req,res){
Truck.findByIdAndRemove(req.params.id, function(err){
	if(err){
		req.flash("error", "Cannot find id:" + req.params.id +"truck");
		res.redirect("/trucks");
	}else{
		req.flash("success", "Truck deleted!");
		res.redirect("/trucks");
	}
})
})


module.exports = router;