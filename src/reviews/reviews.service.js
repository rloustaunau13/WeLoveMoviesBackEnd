const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");


async function update(updatedReview) {
     
  let reviewId=updatedReview.review_id;
  
  

let res1=  await knex("reviews")
   .select("*")
    .where({ review_id: reviewId })
    .update(updatedReview, "*");
  

  
  let result=await  knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first();

  return result;
}



async function read(reviewId) {
  return knex("reviews as r")
    .select("*")
    .where({ review_id: reviewId })
    .first();
}

function destroy(reviewId) {
  console.log("aSDF"+reviewId);
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  update,
  read,
  destroy,
};