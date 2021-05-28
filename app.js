    var express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        flash           = require("connect-flash"),
        methodOverride   = require("method-override"),
        Session         = require("express-session"),
        passport        = require("passport"),
        LocalStrategy   = require("passport-local"),
        mongoose        = require("mongoose"),
        User            = require("./models/user");
       // seedDB          = require("./seeds");
    
    var commentRoutes    = require("./routes/comments"),
        indexRoutes      = require("./routes/index"),
        campgroundRoutes = require("./routes/campgrounds");
        
    mongoose.connect('mongodb://localhost/yelp_camp_v11', { useNewUrlParser: true });
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride("_method"));
    app.set("view engine", "ejs");
    app.use(flash());
    app.use(express.static(__dirname + "/public"));
 //   seedDB(); Seed is stopped.

//================================
//    Passport config
//================================

    app.use(Session({
        secret: "my secret note i created",
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    app.use(function(req,res,next){
        res.locals.currentUser  = req.user;
        res.locals.error        = req.flash("error");
        res.locals.success      = req.flash("success");
        next();
    });
    
    app.use(commentRoutes);
    app.use(campgroundRoutes);
    app.use(indexRoutes);
    
    
    app.listen(process.env.PORT, process.env.IP, function() {
        console.log("The YelpCamp server has started");
    });