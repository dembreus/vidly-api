const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost/vidly",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Couldn't connect to MongoDB ", err));

const genreSchema = new mongoose.schema({
  name: String
});

const Genre = mongoose.model("Genre", genreSchema);

const genres = [
  { id: 0, name: "Action" },
  { id: 1, name: "Drama" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Thriller" },
  { id: 4, name: "Rom-Com" }
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length,
    name: req.body.name
  };

  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;

  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

// Validating a genre
const validateGenre = genre => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre, schema);
};

module.exports = router;
