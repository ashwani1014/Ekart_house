const express=require("express");
const app=express();
const mongoose=require("mongoose"); 
const ejs=require("ejs");
const Listing=require("./models/listing.js");
const MONGO_URL="mongodb://127.0.0.1:27017/Renthouse"
const path=require("path");
const methodOverride=require("method-override");
const ejsmate=require("ejs-mate");
const reviews=require("./models/review.js");
app.use(express.static("public"));
const session = require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const { Session } = require("inspector");

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    SaveUnintialized:true,
    cookie:{
        expires:Date.now() +7*24*60*60*1000,
        MaxAge:7*24*60*60*1000,
        httpOnly:true,

    }, 
};
app.use(session(sessionOptions));

async function main() {
    await mongoose.connect(MONGO_URL);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsmate);
 
app.use(express.static('public'));




main().then(()=>{
console.log("connected to DB");
})

.catch((err)=>{
    console.log(err);
});

app.get("/",(req,res)=>{
    res.send("Hiii ,I am good");
});

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


app.get("/demouser",async(req,res)=>{

})
  


// Index Route
app.get("/listings", async (req,res) =>{
  const alllisting= await Listing.find({});
 res.render("listings/index.ejs",{alllisting});
 console.log(alllisting);
});
 
//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

// Show Route
app.get("/listings/:id", async(req,res)=>{
    let {id}=req.params;
    const listings=await Listing.findById(id);
    res.render("listings/show.ejs",{listings});

});

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listings=await Listing.findById(id);
    res.render("listings/edit.ejs",{ listings });
});
 
//update Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.Listing });
    res.redirect(`/listings/${id}`);
});


//delete Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings"); // redirect to listings page
});

//create Route
app.post("/listings", async (req, res) => {
    const newlistings = new Listing(req.body.listing);
    await newlistings.save();
    res.redirect("/listings");
    console.log(newlistings);
});

 
// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing ({
//         title:"My Home",
//         description:"By the beach",
//         price:1200,
//         location :"Calangute , Goa",
//         country : "India",
//  });
//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("sucessfull testing");
//  });

//review
app.post("/listings/:id/reviews", async (req, res) => {
  try {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving review");
  }
});








app.listen(8080,()=>{
    console.log("Server is running on port 8080");
});