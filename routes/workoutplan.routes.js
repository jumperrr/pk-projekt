const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = app => {
  const workoutplans = require("../controllers/workoutplan.controller");

  // Create a new workoutplan
  app.post("/workoutplans", workoutplans.create);

  // Retrieve a single workoutplan with workoutplanId
  app.get("/workoutplan/:userId", passport.authenticate('jwt', { session : false }), workoutplans.findOne);

  // Retrieve all workoutplans
  app.get("/workoutplans", workoutplans.findAll);

  // Update a workoutplan with workoutplanId
  app.put("/workoutplan/:workoutplanId", workoutplans.update);

  // Delete a workoutplan with workoutplanId
  app.delete("/workoutplan/:workoutplanID", workoutplans.delete);

  //delete all workoutplans
  app.delete("/workoutplans", workoutplans.deleteAll);
};