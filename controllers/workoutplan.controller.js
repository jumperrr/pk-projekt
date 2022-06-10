const Workoutplan = require("../models/Workoutplan");

// Create and Save a new workoutplan
exports.create = (req, res) => {
// Validate request
if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a workoutplan
  const workoutplan = new Workoutplan({
    date: req.body.date,
    userID: req.body.userID,
    name: req.body.name
  });
  // Save workoutplan in the database
  Workoutplan.create(workoutplan, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the workoutplan."
      });
    else res.send(data);
  });
};


// Retrieve all workoutplans from the database.
exports.findAll = (req, res) => {
    Workoutplan.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving workoutplans."
          });
        else res.send(data);
      });
    };


/* // Find a single workoutplan with a workoutPlanID
 exports.findOne = (req, res) => {
    Workoutplan.findById(req.params.workoutPlanID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Workoutplan with id ${req.params.workoutPlanID}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Workoutplan with id " + req.params.workoutPlanID
            });
          }
        } else res.send(data);
      });
    };  */

    exports.findOne = (req, res) => {
      Workoutplan.findByUserId(req.params.userId, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Workoutplan with id ${req.params.userId}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving Workoutplan with id " + req.params.userId
              });
            }
          } else res.send(data);
        });
      };

// Update a workoutplan identified by the workoutPlanID in the request
exports.update = (req, res) => {
 // Validate Request
 if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Workoutplan.updateById(
    req.params.workoutplanID,
    new Workoutplan(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found workoutplan with id ${req.params.workoutplanID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating workoutplan with id " + req.params.workoutplanID
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a workoutplan with the specified workoutPlanID in the request
exports.delete = (req, res) => {
    Workoutplan.remove(req.params.workoutplanID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Workoutplan with id ${req.params.workoutplanID}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Workoutplan with id " + req.params.workoutplanID
            });
          }
        } else res.send({ message: `Workoutplan was deleted successfully!` });
      });
    };

// Delete all workoutplans from the database.
exports.deleteAll = (req, res) => {
    Workoutplan.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all workoutplans."
          });
        else res.send({ message: `All workoutPlan were deleted successfully!` });
      });
    }; 