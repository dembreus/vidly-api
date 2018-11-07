const express = require("express");
const router = express.Router();
const movies = [
  { id: 0, title: "Black Panther", genre: "Action" },
  { id: 1, title: "Phantom of the Opera", genre: "Drama" },
  { id: 2, title: "Sausage Party", genre: "Comedy" },
  { id: 3, title: "Moonrise Kingdom", genre: "Drama" },
  { id: 4, title: "How to Lose a Guy in Ten Days", genre: "Rom-Com" }
];

router.get("/", (req, res) => {
  res.send(movies);
});

router.get("/:id", (req, res) => {
  const movie = movies.find(movie => movie.id === parseInt(req.params.id));
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  res.send(movie);
});

router.post("/", (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = {
    id: movies.length,
    title: req.body.title,
    genre: req.body.genre
  };

  movies.push(movie);
  res.send(movie);
});

router.put("/:id", (req, res) => {
  const movie = movies.find(movie => movie.id === parseInt(req.params.id));

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  movie.title = req.body.title;
  movie.genre = req.body.genre;

  res.send(movie);
});

router.delete("/:id", (req, res) => {
  const movie = movies.find(movie => movie.id === parseInt(req.params.id));

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  const index = movies.indexOf(movie);
  movies.splice(index, 1);

  res.send(movie);
});

// Validating a movie
const validateMovie = movie => {
  const schema = {
    title: Joi.string()
      .min(3)
      .required(),
    genre: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(movie, schema);
};

module.exports = router;
