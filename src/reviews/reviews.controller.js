const service = require("./reviews.service");
const boundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties")




async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  
  //console.log(reviewId+"reviewExists");
  
  
  
 if(!reviewId){
    
     return next({ status: 404, message: `Review cannot be found.` });
  }
  
  const review = await service.read(reviewId);
  
 // console.log(review+"REVIEWSS FROM DB");
  if (!review) {
    
   
  res.status(404).json({ error: "Review cannot be found" });
  }
  // res.locals.review.review_id=reviewId;
   res.locals.review = review;
    return next();
  
}

async function update(req, res) {
  try {
    const { reviewId } = req.params;
    console.log("Updating review with ID:", reviewId);

    
    const reduceMovies = reduceProperties("review_id", {
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
  
});
    
    
    
    
    const updatedReview = {
      ...res.locals.review,
      review_id: res.locals.review.review_id,
    };

   // console.log("Updated Review:", updatedReview);

    updatedReview.content='Content';
    // Perform the update operation
    const updatedData = await service.update(updatedReview);

    // Log the result of the update operation
    console.log("Updated Review Data:", updatedData);
    
    const result= reduceMovies([updatedData]);
    
    console.log(result);
    
    res.json({ data: result[0] });
  } catch (error) {
    // Handle errors, either return an error response or pass it to the error-handling middleware
    console.error("Error updating review:", error);
    res.status(404).json({ error: "Internal Server Error" });
  }
}

async function destroy(req, res) {
  const { reviewId } = req.params;
//console.log(reviewId+"DESTROY");
  await service.destroy(reviewId);
  res.sendStatus(204);
}

module.exports = {
  destroy: [boundary(reviewExists), boundary(destroy)],
  update: [boundary(reviewExists), boundary(update)],
  
};