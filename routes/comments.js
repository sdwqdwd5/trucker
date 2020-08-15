var express =require("express");
var router = express.Router({mergeParams: true});
var Truck = require("../models/truck");
var Comment = require("../models/comment");
var middlewareObj = require("../middleware")


router.post("/", middlewareObj.isLoggedIn, function(req,res){
	Truck.findById(req.params.id,function(err, truck){
		if(err){
			console.log(err);
			res.redirect("/");
		}else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Cannot find id: '" + req.params.id + "' truck");
					console.log(err);
				}else{
                    comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					truck.comments.push(comment);
					truck.save();
					req.flash("success", "Comment created!");
					res.redirect("/trucks/"+truck._id);
				}
			})
		}
	});
});
router.put("/:comment_id", middlewareObj.checkCommentUser, function(req,res){
	
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			req.flash("error","Cannot find id:" + req.params.comment_id +"comment");
			res.redirect("/")
		}else{
			req.flash("success", "Comment updated!");
			res.redirect("/trucks/" + req.params.id);
		}
	} )
})

router.delete("/:comment_id", middlewareObj.checkCommentUser, function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			req.flash("error","Cannot find id:" + req.params.comment_id +"comment");
			res.redirect("/trucks" + req.params.id);
		}else{
			console.log(req.params.id);
			req.flash("success", "Comment deleted");
			res.redirect("/trucks/" + req.params.id);
		}
	})
})


module.exports = router;