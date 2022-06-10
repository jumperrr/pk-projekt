const Unit = require("../models/Unit");

// Create and Save a new unit
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const unit = new Unit({
    name: req.body.name,
  });

  // Save Customer in the database
  Unit.create(unit, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all units from the database.
exports.findAll = (req, res) => {
    Unit.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving units."
          });
        else res.send(data);
      });
    };

// Find a single unit with a unitId
exports.findOne = (req, res) => {
    Unit.findById(req.params.unitId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Unit with id ${req.params.unitId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Unit with id " + req.params.unitId
            });
          }
        } else res.send(data);
      });
    };

// Update a unit identified by the unitId in the request
exports.update = (req, res) => {
 // Validate Request
 if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Unit.updateById(
    req.params.unitId,
    new Unit(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Unit with id ${req.params.unitId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Unit with id " + req.params.unitId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a unit with the specified unitId in the request
exports.delete = (req, res) => {
    Unit.remove(req.params.unitId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Unit with id ${req.params.unitId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Unit with id " + req.params.unitId
            });
          }
        } else res.send({ message: `Unit was deleted successfully!` });
      });
    };

// Delete all units from the database.
exports.deleteAll = (req, res) => {
    Unit.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all units."
          });
        else res.send({ message: `All Unit were deleted successfully!` });
      });
    }; 