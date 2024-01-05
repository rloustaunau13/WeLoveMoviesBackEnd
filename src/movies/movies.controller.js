const service = require("./movies.service");
const boundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties")


async function read(req, res) {

const movie=res.locals.movie;
  
  
  
  res.json({data:movie});
}

async function movieExists(req, res, next) {
  const { movieId } = req.params;

  
 if(!movieId){
    
     return next({ status: 404, message: `Movie cannot be found.` });
  }
  
  const movie = await service.read(movieId);
  
  
  
  //console.log(review+"REVIEWSS FROM DB");
  if (!movie) {
    
   
  res.status(404).json({ error: "Movie cannot be found" });
  }
  // res.locals.review.review_id=reviewId;
   res.locals.movie = movie;
    return next();
  
}

async function listTheaters(req,res) {
 const { movieId } = req.params;

  
  const movies = await service.listTheaters(movieId);

  
    res.json({ data: movies });
}


async function listReviews(req,res,path) {
  
 
  
/*

{
  "data": [
    {
      "review_id": 1,
      "content": "Lorem markdownum ...",
      "score": 3,
      "created_at": "2021-02-23T20:48:13.315Z",
      "updated_at": "2021-02-23T20:48:13.315Z",
      "critic_id": 1,
      "movie_id": 1,
      "critic": {
        "critic_id": 1,
        "preferred_name": "Chana",
        "surname": "Gibson",
        "organization_name": "Film Frenzy",
        "created_at": "2021-02-23T20:48:13.308Z",
        "updated_at": "2021-02-23T20:48:13.308Z"
      }
    }
    // ...
  ]
}





*/

  
  
      
    const reduceMovies = reduceProperties("review_id", {

  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],

  
    });
  
  
  
  
 const { movieId } = req.params;
  
  
  
    


 if (path !== '/movies/:movieId/critics') {
  const movies = await service.listReviews(movieId);


    const result= reduceMovies(movies);
    

  
    res.json({ data: result});
 }
}


async function listNoCritics(req, res) {
  
  
   res.status(404).json({ error: "Internal Server Error" });
}




async function list(req, res) {




 const { is_showing } = req.query;

    if (is_showing === 'true') {
      

      // If is_showing=true, fetch only movies currently showing
      const moviesShowing = await service.active();
      

      res.json({ data: moviesShowing });
    } else {
      // If is_showing is not provided or is false, fetch all movies
      const movies = await service.list();
      res.json({ data: movies });
    }

 }


/*

In the event where is_showing=true is provided, the route should return only those movies where the movie is currently showing in theaters. This means you will need to check the movies_theaters table.

The response from the server should look identical to the response above except that it may exclude some records.


*/




 module.exports = {
  list: boundary(list),
  read:[boundary(movieExists),boundary(read)],
  listTheaters:boundary(listTheaters),
  listReviews:boundary(listReviews),
  listNoCritics:boundary(listNoCritics),
 };