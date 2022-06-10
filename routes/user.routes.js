const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = app => {
    const users = require("../controllers/user.controller");
  
    // Create a new user
    app.post("/users", users.create);
  
    // Retrieve all users
    app.get("/users", users.findAll);
  
    // Retrieve a single user with userId
    app.get("/user/:userId", passport.authenticate('jwt', { session : false }), users.findOne);
  
    // Update a user with userId
    app.put("/user/:userId", users.update);
  
    // Delete a user with userId
    app.delete("/user/:userId", users.delete);
  
    //delete all users
    app.delete("/users", users.deleteAll);

    app.post("/signup", passport.authenticate('signup', { session : false }) , async (req, res, next) => {
      res.json({ 
        message : 'Signup successful',
        user : req.user 
      });
    });

    app.post('/login', async (req, res, next) => {
      passport.authenticate('login', async (err, user, info) => {     try {
          if(err || !user){
            const error = new Error('An Error occurred')
            return next(error);
          }
          req.login(user, { session : false }, async (error) => {
            if( error ) return next(error)
            //We don't want to store the sensitive information such as the
            //user password in the token so we pick only the email and id
            const body = { _id : user._id, email : user.email };
            //Sign the JWT token and populate the payload with the user email and id
            const token = jwt.sign({ user : body },'top_secret');
            //Send back the token to the user
            let data = {
              token: token,
              userID: user.userID
            }
            return res.json({ data });
          });     } catch (error) {
          return next(error);
        }
      })(req, res, next);
    });

  };