require("dotenv").config();



var express = require("express");
var app = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var passport    = require("passport");
var LocalStrategy = require("passport-local");
var User        = require("./models/user");
var passportLocalMongoose = require("passport-local-mongoose");
var flash = require("connect-flash");


var url = process.env.DATABASEURL ||"mongodb://localhost/beatword" ;

mongoose.connect(url,{
	useNewUrlParser:true,
	useUnifiedTopology:true,
});


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));


app.set("view engine", "ejs");

app.locals.randomWords = require('random-words');

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
   next();
});



app.get("/",function(req,res){
	res.render("landing");
})



app.get("/game",isLoggedIn,function(req,res){
	res.render("index");
})




// show register form
app.get("/register", function(req, res){
   res.render("register"); 
});


//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
			req.flash("error",err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/game"); 
        });
    });
});



// show login form
app.get("/login", function(req, res){
   res.render("login"); 
});


// handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/game",
        failureRedirect: "/login",
	    failureFlash: true
    }), function(req, res){
});



// logic route
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/login");
});



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
