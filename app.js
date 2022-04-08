const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser")
const _ = require("lodash");

app.use(bodyParser.urlencoded({ extended: false }))

const blogHeading=["Day 1", "Day 2", "Day 3"];
const blogContent=["Volutpat blandit aliquam etiam erat. Adipiscing elit pellentesque habitant morbi tristique senectus et netus et. Arcu non sodales neque sodales ut etiam sit. Lacus viverra vitae congue eu. Urna id volutpat lacus laoreet non curabitur gravida arcu. Faucibus ornare suspendisse sed nisi. Enim sed faucibus turpis in eu mi bibendum neque. Orci nulla pellentesque dignissim enim sit. Ornare quam viverra orci sagittis eu volutpat odio facilisis. Sodales neque sodales ut etiam sit amet nisl purus in. Rhoncus est pellentesque elit ullamcorper. Arcu odio ut sem nulla pharetra diam. Integer malesuada nunc vel risus commodo viverra. Dapibus ultrices in iaculis nunc sed augue lacus. Ac felis donec et odio pellentesque diam volutpat.", "Ut porttitor leo a diam sollicitudin tempor id eu nisl. Duis at consectetur lorem donec massa sapien faucibus et. Cum sociis natoque penatibus et. Non blandit massa enim nec dui nunc mattis enim. Aliquam eleifend mi in nulla posuere sollicitudin aliquam. Volutpat lacus laoreet non curabitur gravida arcu. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat in. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Dolor sit amet consectetur adipiscing elit ut aliquam purus. Iaculis urna id volutpat lacus laoreet. Vitae tortor condimentum lacinia quis. In pellentesque massa placerat duis. Id aliquet lectus proin nibh. Dui faucibus in ornare quam viverra orci. Massa placerat duis ultricies lacus sed turpis. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Nunc sed blandit libero volutpat sed cras ornare arcu dui. Vel eros donec ac odio tempor orci dapibus.","Commodo elit at imperdiet dui accumsan sit. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Porttitor eget dolor morbi non arcu risus. Lectus quam id leo in vitae. Velit sed ullamcorper morbi tincidunt ornare massa. Lectus nulla at volutpat diam ut. Condimentum lacinia quis vel eros donec ac odio tempor orci. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Suspendisse sed nisi lacus sed viverra tellus in hac. Vitae turpis massa sed elementum tempus egestas sed sed. Magnis dis parturient montes nascetur ridiculus mus. Eget dolor morbi non arcu risus quis varius quam quisque. Nec ultrices dui sapien eget mi proin sed libero. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Vestibulum lectus mauris ultrices eros in cursus turpis. Lacus viverra vitae congue eu consequat. Arcu risus quis varius quam. In eu mi bibendum neque egestas congue quisque. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper"];

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');

// home page
app.get("/",function(req,res){
    res.render("home", {blogHeading, blogContent});
})
// about page
app.get("/about",function(req,res){
    res.render("about");
})

//contact page
app.get("/contact",function(req,res){
    res.render("contact");
})

//posts page
// app.get("/posts/:title",function(req,res){
//     const requestedTitle = _.lowerCase(req.params.title);
//     blogHeading.forEach(function(heading){
//         const storedTitle = _.lowerCase(heading);
    
//         if (storedTitle === requestedTitle) {
//           res.render("posts", {
//             blogHeading: heading
//           });
//         }
//         else{
//             console.log("this does not work...");
//         }
//       });  
//     })


app.get("/posts/:title",function(req,res){
    const requestedTitle = _.lowerCase(req.params.title);
    for (var i=0;i<blogHeading.length;i++){
        const storedTitle = _.lowerCase(blogHeading[i]);
        if (storedTitle === requestedTitle) {
          res.render("posts", {
            blogHeading: blogHeading[i], blogContent: blogContent[i]
          });
        }
    }  
})


//compose page
app.get("/compose",function(req,res){
    res.render("compose");
})

// blog post request
app.post("/", function(req,res){
    let newTitle=req.body.title;
    let newPost=req.body.post;
    blogHeading.push(newTitle);
    blogContent.push(newPost);
    res.redirect("/");
})

// port listen
app.listen("3000", function(res){
    console.log("server listening on port 3000");
})