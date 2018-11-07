const Joi = require("joi");
const movies = require("./routes/movies");
const genres = require("./routes/genres");
const home = require("./routes/home");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/movies", movies);
app.use("/api/genres", genres);
app.use("/", home);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
