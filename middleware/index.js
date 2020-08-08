

var Truck = require("../models/truck")
var Comment    = require("../models/comment")


var middlewareObj={};

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "PLEASE LOG IN")
	res.redirect("/login");
}

middlewareObj.checkTruckUser = function(req,res,next){
	middlewareObj.isLoggedIn;
	Truck.findById(req.params.id,function(err,foundTruck){
		if(err){
			req.flash("error", "Cannot find id:" + req.params.id +"truck");
			res.redirect("back")
		}else{
			if(foundTruck.author.id == req.user.id){
				next();
			}else{
				res.redirect("back")
			}

		}
	})
}
middlewareObj.checkCommentUser = function(req,res,next){
	middlewareObj.isLoggedIn;
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			req.flash("error","Cannot find id:" + req.params.comment_id +"comment");
			res.redirect("back")
		}else{
			if(foundComment.author.id == req.user.id){
				next();
			}else{
				res.redirect("back")
			}

		}
	})	
}

module.exports = middlewareObj