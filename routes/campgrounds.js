    var express = require("express"),
        router = express.Router();

    var Campground = require("../models/campground");
    var middlewareObj = require("../middleware");

    
    router.get("/campgrounds", function(req, res) {

        // Get all campgrounds from DB
        Campground.find({}, function(err, allCampgrounds) {
            if (err) {
                console.log(err);
            }
            else {
                res.render("campgrounds/index", { campgrounds: allCampgrounds });
            }
        });
    });

    //================= Vipin Viswanathan ===============
    // Add New campground to DataBase
    //===================================================

    router.post("/campgrounds",middlewareObj.isLoggedIn, function(req, res) {
        var name = req.body.name;
        var image = req.body.image;
        var desc = req.body.description;
        var author = {
                        id: req.user._id,
                        username: req.user.username
                    };
        var newCampground = { name: name, image: image, description: desc, author:author };
        //create a new campground and save to DB
        Campground.create(newCampground, function(err, newlyCreated) {
            if (err) {
                console.log(err);
            }
            else {
                // redirect back to campgrounds page
                res.redirect("/campgrounds");
            }
        });


    });

    //================= Vipin Viswanathan ===============
    // Displays form to make a New campground
    //===================================================
    router.get("/campgrounds/new",middlewareObj.isLoggedIn, function(req, res) {
        res.render("campgrounds/new");
    });

    //================= Vipin Viswanathan ===============
    // Displays info about one campground
    //===================================================

    router.get("/campgrounds/:id", function(req, res) {

        // find the campground with provided ID
        Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
            if (err || !foundCampground) {
                req.flash("error", "campground not found");
                res.redirect("back");
            }
            else {
                // render/show template with that campground
                res.render("campgrounds/show", { campground: foundCampground });
            }

        });
    });
    
    //================= Vipin Viswanathan ===============
    // Edit or Update Campground
    //===================================================
    router.get("/campgrounds/:id/edit", middlewareObj.checkCampgroundOwnership, function(req, res) {
        Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
            
        });
    });
    
    router.put("/campgrounds/:id",middlewareObj.checkCampgroundOwnership, function(req,res){
        
        // find and update the correct campground
        Campground.findByIdAndUpdate(req.params.id, req.body.campground,function(err,updateCampground){
            if(err){
                res.redirect("/campgrounds");
            } else{
                // redirect to some where
                res.redirect("/campgrounds/" + req.params.id);
            }
        });    
    });
    
    //================= Vipin Viswanathan ===============
    // Delete or Destroy Campground
    //===================================================
    router.delete("/campgrounds/:id",middlewareObj.checkCampgroundOwnership, function(req,res){
        Campground.findByIdAndRemove(req.params.id, function(err){
            if(err){
                res.redirect("/campgrounds");
            } else {
                res.redirect("/campgrounds");
            }
        });
    });
    
 

    module.exports = router;