var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();

//SCHEMA setup
var campSchema = new mongoose.Schema({
    name: String,
    image: String
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

var campgrounds = [
    {name: "Sauraha", image: "http://www.wildnatureimages.com/images%203/060731-372..jpg"},
    {name: "Markhu", image: "http://www.nationalparks.nsw.gov.au/~/media/D97B5C772FB44716B8CD3E5289685B96.ashx"},
    {name: "Nagarkot", image: "http://www.holidaystonepal.com/wp-content/uploads/2017/01/camping-1024x559.jpg"},
    {name: "Sauraha", image: "http://www.wildnatureimages.com/images%203/060731-372..jpg"},
    {name: "Markhu", image: "http://www.nationalparks.nsw.gov.au/~/media/D97B5C772FB44716B8CD3E5289685B96.ashx"},
    {name: "Nagarkot", image: "http://www.holidaystonepal.com/wp-content/uploads/2017/01/camping-1024x559.jpg"},
    {name: "Sauraha", image: "http://www.wildnatureimages.com/images%203/060731-372..jpg"},
    {name: "Markhu", image: "http://www.nationalparks.nsw.gov.au/~/media/D97B5C772FB44716B8CD3E5289685B96.ashx"},
    {name: "Nagarkot", image: "http://www.holidaystonepal.com/wp-content/uploads/2017/01/camping-1024x559.jpg"}
];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'YelpCamp' });
});

router.get('/campgrounds', function (req, res, next) {
    Campground.find({}, function (err, allCampgrounds) {
        if(err){
            console.log("Error Occured in find");
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    });
    //res.render("campgrounds", {campgrounds: campgrounds});
});

router.post("/campgrounds", function (req, res, next) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
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


module.exports = router;
