    var express = require("express"),
        router = express.Router(),
        passport = require("passport");

    var User = require("../models/user");


    router.get("/", function(req, res) {
        res.render("landing");
    });

    //===================================
    // User Authentication Route
    //===================================

    router.get("/register", function(req, res) {
        res.render("register");
    });

    router.post("/register", function(req, res) {
        var newUser = new User({ username: req.body.username });
        User.register(newUser, req.body.password, function(err, user) {
            if (err) {
                req.flash("error", err.message);
                return res.redirect("register");
            }
            passport.authenticate("local")(req, res, function() {
                req.flash("success", "welcome to the YelpCamp " + user.username);
                res.redirect("/campgrounds");
            });
        });
    });

    //===============================
    // Login In
    //================================

    router.get("/login", function(req, res) {
        res.render("login");
    });

    router.post("/login", passport.authenticate("local", {
        
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {

    });

    //============================================
    //=====Logout==============
    //============================================

    router.get("/logout", function(req, res) {
        req.logout();
        req.flash("success", "Logged out from YelpCamp, See you soon");
        res.redirect("/campgrounds");
    });

    module.exports = router;