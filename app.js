//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");
const val = require("validator");
app.set('view engine', 'ejs');

var signin = false;
const requests=[{type :"Class Room",
          slot :"1",
        cap : "56",
      date : "08-03-2021",
    stat: "Accepted"}];
const users = [{

  username: "user1",
  pwd: "login1",
  name: "Kishore",
  dept:"CSE",
  phone: 8825897100,
  email:"kishoreak2000@gmail.com"
}, {
  username: "user2",
  pwd: "login2",
  name:"Nitheese",
  dept:"CSE",
  phone:7094971371,
  email:"nitheese456@gmail.com"
}];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000,function(req,res){
  console.log("Port is running");
});

app.get("/",function(req,res){
res.render("home");
});

app.get("/time",function(req,res){
  res.sendFile(__dirname + "/time.html");
});

app.get("/log",function(req,res){
res.render("log",{users:users});
//res.sendFile("log.html")
});
app.get("/occ",function(req,res){
  res.render("occ");
});
app.get("/reserve",function(req,res){
res.render("reserve");
});

app.get("/admindash", function(req,res){
  res.render("admindash");
});


app.post("/dash",function(req,res){

    signin = true;
  name = req.body.name;
   res.redirect("dash"+"/"+name);   

 });



app.get("/dash/:link",function(req,res){
const links = req.params.link;
const user =  users.find( o => o.username === links );

if( user){
res.render("dash",{user:user})

}
else{
  console.log("Not Found**");
}
});
app.get("/noti",function(req,res){
  res.render("noti", {requests:requests});
});

app.post("/noti",function(req,res){
  var reqs = {type : req.body.first,
            slot : req.body.second,
          cap : req.body.cap,
        date : req.body.date,
      stat: "Pending"}

requests.push(reqs);
res.render("noti",{requests:requests});
});


app.get("/reqC",function(req,res){
  res.sendFile(__dirname+"/reqC.html");
});
