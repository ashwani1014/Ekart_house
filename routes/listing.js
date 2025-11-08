const express =require("express");
const router=express.Router();

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
    console.log(listings);
     
});

review
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


module.exports = router;
