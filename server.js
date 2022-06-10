var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors') 
var app = express();
 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 
// parse requests of content-type: application/json
app.use(bodyParser.json());
 
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
 
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to workout application." });
});

app.use(cors());
app.options('*', cors());

require("./routes/user.routes.js")(app);
require("./routes/exercise.routes.js")(app);
require("./routes/unit.routes.js")(app);
require("./routes/category.routes.js")(app);
require("./routes/workoutplan.routes.js")(app);
require("./routes/training.routes.js")(app); 
 
  
// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});



