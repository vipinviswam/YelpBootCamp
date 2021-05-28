    var express = require("express"),
        router = express.Router();

    var Campground = require("../models/campground");
    var Comment = require("../models/comment");
    var middlewareObj = require("../middleware");

    //================= Vipin Viswanathan ===============
    // Comments Route - New Comment
    //===================================================

    router.get("/campgrounds/:id/comments/new", middlewareObj.isLoggedIn, function(req, res) {
        Campground.findById(req.params.id, function(err, campground) {
            if (err) {
                console.log(err);
            }
            else {
                res.render("comments/new", { campground: campground });
            }
        });
    });
    
    //================= Vipin Viswanathan ===============
    // Comments Route - Add New Comment
    //===================================================

    router.post("/campgrounds/:id/comments", middlewareObj.isLoggedIn, function(req, res) {
        //lookup campground by id
        Campground.findById(req.params.id, function(err, campground) {
            if (err || !campground) {
                req.flash("error", "campground not found");
                res.redirect("/campgrounds");
            }
            else {
                Comment.create(req.body.comment, function(err, comment) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // add username and id to comment
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                        //save comment
                        comment.save();
                        campground.comments.push(comment);
                        campground.save();
                        res.redirect("/campgrounds/" + campground._id);
                    }
                });
            }
        });
    });
    
    //================= Vipin Viswanathan ===============
    // Comments Route - Edit Comment
    //===================================================
    
    router.get("/campgrounds/:id/comments/:comment_id/edit",middlewareObj.checkCommentOwnership, function(req,res){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "campground not found");
                return res.redirect("back");
            }
            
            Comment.findById(req.params.comment_id,function(err, foundComment) {
           if(err){
               res.redirect("/campgrounds/:id/comments/");
           } else{
               res.render("comments/edit", {campground_id:req.params.id, comment:foundComment});
           }
         });
        });
        
    });
    
    //================= Vipin Viswanathan ===============
    // Comments Route - Update Comment
    //===================================================
    
    router.put("/campgrounds/:id/comments/:comment_id",middlewareObj.checkCommentOwnership, function(req,res){
        Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, function(err,updatedComment){
           if(err){
               res.redirect("back");
           } else{
               res.redirect("/campgrounds/" + req.params.id);
           }
        });
    });
    
    //================= Vipin Viswanathan ===============
    // Comments Route - Destroy/Delete Comment
    //===================================================
    
    router.delete("/campgrounds/:id/comments/:comment_id",middlewareObj.checkCommentOwnership, function(req,res){
       Comment.findByIdAndRemove(req.params.comment_id, function(err){
          if(err){
              res.redirect("back");
          } else {
              res.redirect("/campgrounds/" + req.params.id);
          }
       }); 
    });
    
  
    
    module.exports = router;