var express = require('express');
var mongoose = require("mongoose");
var passport        = require('passport');
var LocalStrategy   = require('passport-local');
var Campground = require("../models/campgrounds.js");
//Campground = require('../models/campgrounds');
var router = express.Router();
var Comment = require("../models/comments");
var User = require("../models/users");


router.use(require('express-session')({
    secret: "This is the secret session",
    resave: false,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

router.get('/', function (req, res, next) {

    Campground.find({}, function (err, allCampgrounds) {
        if(err){
            console.log("Error Occured in find");
        } else {
            res.render("campgrounds/campgrounds", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

//INDEX - Show all the campgrounds
router.get("/campgrounds",function (req, res, next) {
    res.redirect('/');
});

//CREATE - create new campsite to DB
router.post("/campgrounds", function (req, res, next) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, function (err, newCampAdded) {
       if(err){
           console.log("Error Occured in new addition");
       } else {
           console.log("New Camp Added");
           console.log(newCampAdded);
       }
    });
    res.redirect("/campgrounds");
});

//New - Form to create new campsite
router.get("/campgrounds/new", function (req, res, next) {
   res.render("campgrounds/new");
});

//Show - Show the specific campsite
router.get("/campgrounds/:id", function (req, res, next) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
       if(err){
           console.log("Error finding the camp by id");
       } else {
           console.log(foundCampground);
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

//==============
//Comment Routes
//==============

router.get("/campgrounds/:id/comments/new", isLoggedIN, function (req, res) {
//find campground
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground : campground});
        }
    })

});

router.post("/campgrounds/:id/comments", isLoggedIN, function (req, res) {

    // var comment = {
    //     author : req.body.commentAuthor,
    //     text: req.body.commentText
    // };
    //lookup the camp using id
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            console.log(req.body.comment);
            Comment.create(req.body.comment, function (err, comment) {
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id); //campground._id

                }
            })
        }
    })

});

//===============
//Auth Routes
//===============
router.get('/register', function (req, res) {
    res.render('register');
});

//Handle signup Logic
router.post("/register", function (req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        });
    });
});

//Show login
router.get("/login", function (req, res) {
    res.render("login");
});
//Handling the login logic
router.post("/login",passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function (req, res) {
});

//logout
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIN(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
