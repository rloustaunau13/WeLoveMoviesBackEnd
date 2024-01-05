if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const theaterRouter = require("./theaters/theaters.router");
const reviewRouter = require("./reviews/reviews.router");
const movieRouter = require("./movies/movies.router");


app.use(express.json())
app.use(cors());
app.use("/reviews", reviewRouter);

app.use("/theaters", theaterRouter);


app.use("/movies", movieRouter);





module.exports = app;
