const Exercise = require("../models/Exercise");


// Create and Save a new exercise
exports.create = (req, res) => {
// Validate request
if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a exercise
  const exercise = new Exercise({
    name: req.body.name,
    categoryID: req.body.categoryID,
    unitID: req.body.unitID
  });


  // Save exercise in the database
  Exercise.create(exercise, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the exercise."
      });
    else res.send(data);
  });
};

// Retrieve all exercises from the database.
exports.findAll = (req, res) => {
    Exercise.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving exercises."
          });
        else res.send(data);
      });
    };

// Find a single exercise with a exerciseId
exports.findOne = (req, res) => {
    Exercise.findById(req.params.exerciseId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found exercise with id ${req.params.exerciseId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving exercise with id " + req.params.exerciseId
            });
          }
        } else res.send(data);
      });
    };

// Update a exercise identified by the exerciseId in the request
exports.update = (req, res) => {
 // Validate Request
 if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Exercise.updateById(
    req.params.exerciseId,
    new Exercise(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found exercise with id ${req.params.exerciseId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating exercise with id " + req.params.exerciseId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a exercise with the specified exerciseId in the request
exports.delete = (req, res) => {
    Exercise.remove(req.params.exerciseId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found exercise with id ${req.params.exerciseId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete exercise with id " + req.params.exerciseId
            });
          }
        } else res.send({ message: `Exercise was deleted successfully!` });
      });
    };

// Delete all exercises from the database.
exports.deleteAll = (req, res) => {
    Exercise.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all exercises."
          });
        else res.send({ message: `All exercises were deleted successfully!` });
      });
    };