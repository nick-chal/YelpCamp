var express = require('express');
var mongoose = require("mongoose");
//Campground = require('../models/campgrounds');
var router = express.Router();

//SCHEMA setup
var campSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campSchema);
/*Campground.create({
    name: "Sauraha",
    image: "http://www.wildnatureimages.com/images%203/060731-372..jpg"
    }, function (err, campground) {
    if(err){
        console.log("error occured");
    } else {
        console.log("New Campground Added");
        console.log(campground);
    }
});*/
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'YelpCamp' });
// });

router.get('/', function (req, res, next) {
    Campground.find({}, function (err, allCampgrounds) {
        if(err){
            console.log("Error Occured in find");
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    });
    //res.render("campgrounds", {campgrounds: campgrounds});
});

router.get("/campgrounds",function (req, res, next) {
    res.redirect('/');
});

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

router.get("/campgrounds/new", function (req, res, next) {
   res.render("new");
});

router.get("/campgrounds/:id", function (req, res, next) {
    Campground.findById(req.params.id, function (err, foundCampground) {
       if(err){
           console.log("Error finding the camp by id");
       } else {
           res.render("show", {campground: foundCampground});
       }
    });
});


module.exports = router;
