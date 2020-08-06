var express =require("express");
var router = express.Router({mergeParams: true});
var Truck = require("../models/truck");
var Comment = require("../models/comment");


router.post("/", isLoggedIn, function(req,res){
	Truck.findById(req.params.id,function(err, truck){
		if(err){
			console.log(err);
			res.redirect("/trucks");
		}else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				}else{
                    comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					truck.comments.push(comment);
					truck.save();
					res.redirect("/trucks/"+truck._id);
				}
			})
		}
	});
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
module.exports = router;