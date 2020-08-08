var express =require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")

var num = 0;
router.get("/", function(req,res){
	res.render("landing");
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
			req.flash("success", "Welcome new user" + req.body.username +"!")
			res.redirect("/trucks");
		})
	})
});

router.get("/login", function(req,res){
	res.render("login");
})

router.post("/login", passport.authenticate("local",{
	successRedirect:"/trucks",
	failureRedirect:"/login",
	failureFlash : true 
}), function(req,res){
		
})

router.get("/logout", function(req,res){
	req.flash("success", "Successfully Log Out!");
	req.logout();
	res.redirect("/trucks");
})



module.exports = router;
