const knex = require("../db/connection");

/*
: ArrayContaining [ObjectContaining {"address_line_1": "4122 NE Sandy Blvd.", "address_line_2": "", "city": "Portland", "movies": ArrayContaining [ObjectContaining {"rating": "PG", "runtime_in_minutes": 125, "title": "Spirited Away"}], "name": "Hollywood Theatre", "state": "OR", "zip": "97212"}]

address_line','address_line_2','city','name','state','zip'
*/



async function list() {
return knex('theaters')
  .join('movies_theaters', 'theaters.theater_id', 'movies_theaters.theater_id')
  .join('movies', 'movies_theaters.movie_id','movies.movie_id')
 
}

 module.exports = {
  list,
 };