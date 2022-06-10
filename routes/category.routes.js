module.exports = app => {
  const categories = require("../controllers/category.controller");

  // Create a new category
  app.post("/category", categories.create);

  // Retrieve all categories
  app.get("/categories", categories.findAll);

  // Retrieve a single categories with categoryId
  //app.get("/categories/:categoryId", categories.findOne);

  // Update a category with categoryId
  app.put("/category/:categoryId", categories.update);

  // Delete a category with categoryId
  app.delete("/category/:categoryId", categories.delete);

  //delete all categories
  app.delete("/categories", categories.deleteAll);
};