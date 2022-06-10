module.exports = app => {
  const units = require("../controllers/unit.controller");

  // Create a new unit
  app.post("/units", units.create);

  // Retrieve all units
  app.get("/units", units.findAll);

  // Retrieve a single unit with unitId
  app.get("/unit/:unitId", units.findOne);

  // Update a unit with unitId
  app.put("/unit/:unitId", units.update);

  // Delete a unit with unitId
  app.delete("/unit/:unitId", units.delete);

  //delete all units
  app.delete("/units", units.deleteAll);
};