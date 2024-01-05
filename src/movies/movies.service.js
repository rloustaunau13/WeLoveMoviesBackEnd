const knex = require("../db/connection");

/*
In the event where is_showing=true is provided, the route should return only those movies where the movie is currently showing in theaters. This means you will need to check the movies_theaters table.

The response from the server should look identical to the response above except that it may exclude some records.




{
    movie_id: 18,
    title: 'Interstellar',
    runtime_in_minutes: 169,
    rating: 'PG-13',
    description: "Earth's future has been riddled by disasters, famines, and droughts. There is only one way to ensure mankind's survival: Interstellar travel. A newly discovered wormhole in the far reaches of our solar system allows a team of astronauts to go where no man has gone before, a planet that may have the right environment to sustain human life...",
    image_url: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6716_AL_.jpg',
    created_at: '2024-01-04 21:20:28',
    updated_at: '2024-01-04 21:20:28',
    theater_id: 4,
    is_showing: 1
  },
  
  
  
  
  
  
  
  
    {
    movie_id: 18,
    title: 'Interstellar',
    runtime_in_minutes: 169,
    rating: 'PG-13',
    description: "Earth's future has been riddled by disasters, famines, and droughts. There is only one way to ensure mankind's survival: Interstellar travel. A newly discovered wormhole in the far reaches of our solar system allows a team of astronauts to go where no man has gone before, a planet that may have the right environment to sustain human life...",
    image_url: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6716_AL_.jpg',
    created_at: '2024-01-04 21:23:56',
    updated_at: '2024-01-04 21:23:56',
    theater_id: 4,
    is_showing: 1
  },







*/
async function read(movieId) {
  
  console.log("movieId"+movieId);
return knex('movies')
      .select('*')
      .where({ 'movie_id': movieId })
      .first();
  
  
}

async function listTheaters(movieId) {
  

    return knex('movies')
    .select('theaters.*')
    .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
   .join('theaters', 'theaters.theater_id', 'movies_theaters.theater_id')
    .where({ 'movies.movie_id': movieId })

  
  
}



async function listReviews(movieId) {
  

    return knex('reviews')
    .select('reviews.*','critics.*')
    .join('critics', 'reviews.critic_id', 'critics.critic_id')
    .where({ 'reviews.movie_id': movieId })

  
  
}




async function list() {
return knex('movies')
        .select('*');
}


function active() {
  return knex('movies')
    .distinct('movies.movie_id')
    .select('movies.*')
    .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
    .where({ 'movies_theaters.is_showing': true });
}



 module.exports = {
  list,
   active,
   read,
   listTheaters,
   listReviews,
 };