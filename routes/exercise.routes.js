module.exports = app => {
    const exercises = require("../controllers/exercise.controller");
  
    // Create a new user
    app.post("/exercises", exercises.create);
  
    // Retrieve all users
    app.get("/exercises", exercises.findAll);
  
    // Retrieve a single user with userId
    app.get("/exercise/:exerciseId", exercises.findOne);
  
    // Update a user with userId
    app.put("/exercise/:exerciseId", exercises.update);
  
    // Delete a user with userId
    app.delete("/exercise/:exerciseId", exercises.delete);
  
    //delete all users
    app.delete("/exercises", exercises.deleteAll);
  };