var express = require('express');
var mongoose = require("mongoose");
var Campground = require("../models/campgrounds.js");
//Campground = require('../models/campgrounds');
var router = express.Router();


router.get('/', function (req, res, next) {
    Campground.find({}, function (err, allCampgrounds) {
        if(err){
            console.log("Error Occured in find");
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
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
   res.render("new");
});

//Show - Show the specific campsite
router.get("/campgrounds/:id", function (req, res, next) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
       if(err){
           console.log("Error finding the camp by id");
       } else {
           console.log(foundCampground);
           res.render("show", {campground: foundCampground});
       }
    });
});


module.exports = router;
