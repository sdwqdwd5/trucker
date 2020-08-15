var express =require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")
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

router.get("/register", function(req,res){
	res.render("register");
})

router.post("/register", function(req,res){
	User.register(new User({username:req.body.username}), req.body.password, function(err, user){
		if(err){
		
			req.flash("error",err.name + ": "  + err.message);
			
			return res.redirect("register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success", "Welcome new user" +" "+ req.body.username +"!")
			res.redirect("/");
		})
	})
});

router.get("/login", function(req,res){
	res.render("login");
})

router.post("/login", passport.authenticate("local",{
	successRedirect:"/",
	failureRedirect:"/login",
	failureFlash : true 
}), function(req,res){
		
})

router.get("/logout", function(req,res){
	req.flash("success", "Successfully Log Out!");
	req.logout();
	res.redirect("/");
})



module.exports = router;
