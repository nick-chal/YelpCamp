var mongoose    = require('mongoose');
var Campground  = require('./models/campgrounds');
var Comment     = require('./models/comment');

var data = [
    {
        name: "Sauraha",
        image: "http://www.wildnatureimages.com/images%203/060731-372..jpg"
    },
    {
        name: "Sunday Safari",
        image: "https://www.grampiansparadise.com.au/jpg/home-gp/20131016-072--l3--wedding-guests-camping-on-lakeside-sites--at-grampians-paradise-camping-and-caravan-parkland--cropped-939px.jpg"
    },
    {
        name: "Camperzza",
        image: "https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1600x1000%2Fpublic%2F1443561122%2FCAMPING0915-Glacier-National-Park.jpg%3Fitok%3D6gQxpDuT&w=800&q=85"
    }
]

function seedDB() {
    //Remove  all the campgrounds
    Campground.remove({}, function (err) {
        if(err){
            console.log(err);
        }else{
            console.log("Campgrounds removed");

            //Add campgrounds
            data.forEach(function (seed) {
                Campground.create(seed, function (err, campground) {
                    if(err){
                        console.log(err)
                    }else{
                        console.log("Campground Added");

                        //Add comments
                        Comment.create(
                            {
                                author: "Deadpool",
                                text: "Pump the hate brakes Thanos"
                            }, function (err, comment) {
                                if(err){
                                    console.log(err)
                                }else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created the comment");
                                }
                            });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
