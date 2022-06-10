module.exports = app => {
    const trainings = require("../controllers/training.controller");
  
    // Create a new training
    app.post("/trainings", trainings.create);
  
    // Retrieve all trainings
    app.get("/trainings", trainings.findAll);
  
    // Retrieve a single training with trainingId
    app.get("/training/edit/:trainingID", trainings.findOneTraining);
    
    app.get("/training/:workoutplanID", trainings.findOne);

    // Update a training with trainingId
    app.put("/training/:trainingId", trainings.update);
  
    // Delete a training with trainingId
    app.delete("/training/:trainingId", trainings.delete);
  
    //delete all trainings
    app.delete("/trainings", trainings.deleteAll);
  };