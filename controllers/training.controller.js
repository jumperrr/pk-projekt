const Training = require("../models/Training");

// Create and Save a new training
exports.create = (req, res) => {
// Validate request
if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a training
  const training = new Training({
    reps: req.body.reps,
    value: req.body.value,
    exerciseID: req.body.exerciseID,
    workoutplanID: req.body.workoutplanID,
    done:  req.body.done
  });

  // Save training in the database
  Training.create(training, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the training."
      });
    else res.send(data);
  });
};

// Retrieve all trainings from the database.
exports.findAll = (req, res) => {
    Training.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving trainings."
          });
        else res.send(data);
      });
    };

// Find a single training with a trainingId
exports.findOne = (req, res) => {
    Training.findById(req.params.workoutplanID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found training with id ${req.params.workoutplanID}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving training with id " + req.params.workoutplanID
            });
          }
        } else res.send(data);
      });
    };

    exports.findOneTraining = (req, res) => {
      Training.findByTrainingId(req.params.trainingID, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found training with id ${req.params.trainingID}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving training with id " + req.params.trainingID
              });
            }
          } else res.send(data);
        });
      };

// Update a training identified by the trainingId in the request
exports.update = (req, res) => {
 // Validate Request
 if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Training.updateById(
    req.params.trainingId,
    new Training(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found training with id ${req.params.trainingId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating training with id " + req.params.trainingId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a training with the specified trainingId in the request
exports.delete = (req, res) => {
    Training.remove(req.params.trainingId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found training with id ${req.params.trainingId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete training with id " + req.params.trainingId
            });
          }
        } else res.send({ message: `training was deleted successfully!` });
      });
    };

// Delete all trainings from the database.
exports.deleteAll = (req, res) => {
    Training.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all trainings."
          });
        else res.send({ message: `All training were deleted successfully!` });
      });
    };