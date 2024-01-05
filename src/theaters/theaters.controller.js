const service = require("./theaters.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties")







 async function list(req, res) {
  const data = await service.list();

//   console.log(data);
// Assuming reduceTheaterAndMovies function is defined as before
const reduceTheaterAndMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
});

//console.log(JSON.stringify(reduceTheaterAndMovies(data), null, 4));
   
   const response=reduceTheaterAndMovies(data);

  // console.log(response);

res.json({
   data: response, // or just response if using ES6 shorthand
});
 }

 module.exports = {
  list: asyncErrorBoundary(list),
 };