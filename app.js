var express 		 = require("express"),
	app 			 = express(),
	bodyParser 		 = require("body-parser"),
	mongoose 		 = require("mongoose"),
	Truck			 = require("./models/truck"),
	Comment			 = require("./models/comment"),
	passport   		 = require("passport"),
	LocalStrategy 	 = require("passport-local"),
	User 			 = require("./models/user"),
	commentRoutes    = require("./routes/comments"),
 	truckRoutes = require("./routes/trucks"),
	indexRoutes      = require("./routes/index"),
	methodOverride   = require("method-override"),
	flash            = require("connect-flash");

app.use(require("express-session")({
	secret:"CHIA",
	resave:	 false, 
	saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

// mongodb+srv://sdwqdwd5:vul3ejo3@trucker.vct86.mongodb.net/trucker?retryWrites=true&w=majority


var url = process.env.DATABASEURL ;

mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");



app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error       = req.flash("error");
	res.locals.success     = req.flash("success");
	
	next();
});

app.use("/trucks", truckRoutes); //common route
app.use("/trucks/:id/comments", commentRoutes);
app.use(indexRoutes);
app.locals.moment = require('moment');

app.listen(process.env.PORT||3000,function(){
	console.log("server!!!!!!");
});