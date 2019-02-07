const Joi = require("joi");
const express = require("express");
const router = express.Router();
const moment = require("moment");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");

router.post("/", [auth, validate(validateReturn)], async (req, res) => {
  if (!req.body.movieId) return res.status(400).send("No movieId provided.");

  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

  if (!rental) return res.status(404).send("Rental not found.");

  if (rental.dateReturned)
    return res.status(400).send("Return has already been processed.");

  rental.dateReturned = new Date();
  const rentalDays = moment().diff(rental.dateOut, "days");
  rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
  await rental.save();

  await Movie.update(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 }
    }
  );

  return res.status(200).send(rental);
});

function validateReturn(req) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
