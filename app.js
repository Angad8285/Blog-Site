//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const truncate = require('truncate');

const homeStartingContent = " HOME Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = " ABOUT Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = " CONTACT Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const postsAAA = [];
const postsTruncated = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  // // console.log(postsAAA);
  // // console.log(postsTruncated);
  // postsTruncated.forEach(function(jobject) {
  //   jobject.body = truncate(jobject.body, 50)
  //   // console.log(postsAAA);
  //   // console.log(postsTruncated);
  // })
  res.render('home', {
    homeContent: homeStartingContent,
    postsA: postsAAA
  })
})

app.get("/about", function(req, res) {
  res.render('about', {
    aboutContent: aboutContent
  })
})

app.get("/contact", function(req, res) {
  res.render('contact', {
    contactContent: contactContent
  })
})

app.get("/compose", function(req, res) {
  res.render("compose")
})
app.post("/compose", function(req, res) {
  let postTitle = req.body.postTitle
  let postBody = req.body.postBody;
  let typedInfo = {
    title: postTitle,
    body: postBody
  }
  postsAAA.push(typedInfo)
  postsTruncated.push(typedInfo)
  // console.log(postsTruncated);
  res.redirect("/")
})

app.get("/posts/:postName", function(req, res) {
  // res.send(postsAAA)
  console.log(postsAAA);
  let requestedURL = _.lowerCase(req.params.postName);
  let titleList = [];
  let bodyList = [];
  postsAAA.forEach(function(object) {
    titleList.push(object.title)
    bodyList.push(object.body)
  })
  // console.log(titleLsist)
  // console.log(bodyList);
  // console.log(postsAAA);


  for (var i = 0; i < titleList.length; i++) {
    if (requestedURL == _.lowerCase(titleList[i])) {
      res.render("post", {
        title: titleList[i],
        body: bodyList[i]
      })
      // console.log("Match Found!")
      break
    } else {
      if (i === titleList.length - 1) {
        console.log(_.lowerCase(requestedURL))
        res.render("post", {
          title: "ERROR",
          body: "Nothing Found"
        })
      }
    }
  }
})







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
