    
    var Campground  = require("../models/campground");
    var Comment     = require("../models/comment");

    var middlewareObj = { };
    
    middlewareObj.checkCampgroundOwnership   = function checkCampgroundOwnership(req,res,next){
        if(req.isAuthenticated()){
           Campground.findById(req.params.id, function(err, foundCampground) {
               if(err || !foundCampground){
                   req.flash("error", "Campground not found or unexpected error");
                   res.redirect("back");
               } else{
                   if(foundCampground.author.id.equals(req.user._id)){
                       next();
                   } else{
                       req.flash("error", "Permission Denied, Only Owner is permitted");
                       res.redirect("back");
                   }
               }
               
           });
        } else{
            req.flash("error", "Please login, No access without login");
            res.redirect("back");
        }
    }
    
    middlewareObj.checkCommentOwnership   = function checkCommentOwnership(req,res,next){
        if(req.isAuthenticated()){
           Comment.findById(req.params.comment_id, function(err, foundComment) {
               if(err || !foundComment){
                   console.log("I am here");
                   req.flash("error", "Comment not found or unexpected error");
                   res.redirect("back");
               } else{
                   if(foundComment.author.id.equals(req.user._id)){
                       next();
                   } else{
                       req.flash("error", "Permission Denied, Only Owner is permitted");
                       res.redirect("back");
                   }
               }
               
           });
        } else{
            req.flash("error", "Please login");
            res.redirect("back");
        }
    }
    
    middlewareObj.isLoggedIn  = function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "Please login ")
        res.redirect("/login");
    }
    
    module.exports = middlewareObj;