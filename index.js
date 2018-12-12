const mongoose = require("mongoose");
const movies = require("./routes/movies");
const genres = require("./routes/genres");
const home = require("./routes/home");
const express = require("express");
const app = express();

mongoose
  .connect(
    "mongodb://localhost/vidly",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Couldn't connect to MongoDB ", err));

app.use(express.json());
app.use("/api/movies", movies);
app.use("/api/genres", genres);
app.use("/", home);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
