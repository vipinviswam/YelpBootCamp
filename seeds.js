var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment     = require("./models/comment");

var data = [{
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione"
    }, {
        name: "Desert Mesa",
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione"
    }, {
        name: "Canyon Floor",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione"
    }

]

function seedDB() {
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }

        console.log("campgrounds removed");
        
        // Add a few Campgrounds
        
    //     data.forEach(function(seed) {
    //         Campground.create(seed, function(err, campground) {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             else {
    //                 console.log("created a Campground");
                    
    //                 // Add Comments
                    
    //                 Comment.create(
    //                     {
    //                         text: "This place is great, if there is internet",
    //                         author: "its me"
    //                     }, function(err,comment){
    //                     if(err){
    //                         console.log(err);
    //                     } else{
    //                       campground.comments.push(comment);
    //                       campground.save();
    //                       console.log("created a new Comment");
    //                     }
    //                 });
    //             }
    //         });
    //     });

     });
}




module.exports = seedDB;
