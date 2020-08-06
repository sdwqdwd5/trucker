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
router.put("/:comment_id", checkUser, function(req,res){
	
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("/trucks")
		}else{
			res.redirect("/trucks/" + req.params.id);
		}
	} )
})

router.delete("/:comment_id",checkUser, function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("/trucks");
		}else{
			console.log(req.params.id);
			res.redirect("/trucks/" + req.params.id);
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
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err){
				res.redirect("back")
			}else{
				if(foundComment.author.id == req.user.id){
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