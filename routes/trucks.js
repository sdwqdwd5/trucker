var express = require("express");
var router = express.Router();
var Truck = require("../models/truck");
// var client = require("../public/client");

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
    var author ={
		id: req.user._id,
		username: req.user.username
	}
	var newTruck = {name:name, image:image, description:description, author:author};
	Truck.create(newTruck, function(err, newlyCreateTruck){
		if(err){
			console.log(err);
		}else{
			res.redirect("/trucks");	
		}
	})	
});
router.get("/:id/edit",checkUser,function(req,res){
	
	Truck.findById(req.params.id,function(err,foundTruck){
		if(err){
			res.redirect("/trucks")
		}else{
			res.render("trucks/edit", {truck: foundTruck});
		}
	})
})

router.put("/:id",checkUser, function(req,res){

Truck.findByIdAndUpdate(req.params.id, req.body.truck, function(err, updatedTruck){
	if(err){
		res.redirect("/trucks")
	}else{
		res.redirect("/trucks/" + req.params.id);
	}
} )
})

router.delete("/:id",checkUser, function(req,res){
Truck.findByIdAndRemove(req.params.id, function(err){
	if(err){
		res.redirect("/trucks");
	}else{
		res.redirect("/trucks");
	}
})
})

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

function checkUser(req,res,next){
	if(req.isAuthenticated()){
		Truck.findById(req.params.id,function(err,foundTruck){
			if(err){
				res.redirect("back")
			}else{
				if(foundTruck.author.id == req.user.id){
					next();
				}else{
					res.redirect("back")
				}
				
			}
		})
	
	}else{
		res.redirect("/login")
	}
}
module.exports = router;