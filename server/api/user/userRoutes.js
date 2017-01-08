const userRouter = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userModel = require('./userModel');
const authMiddleware = require('../../middleware/authMiddleware');

const secretKey = process.env.SECRET_KEY || 'vodvod';

userRouter.get('/', authMiddleware.checkUser, function(req, res) {
  userModel.find({}, function(err, users) {
    if (err) {
      return res.status(403).send(err);
    }
    // object of all the users
    res.status(200).send(users);
  });
});

userRouter.get('/:id', function(req, res) {
  userModel.findById(req.params.id, function(err, user) {
    if (err) {
      return res.status(403).send(err);
    }
    // show the one user
    res.status(200).send(user);
  });
});

userRouter.post('/register', function(req, res) {
  console.log(req.body)
  userModel.register(new userModel({
    username : req.body.username,
    email : req.body.email,
    isAdmin: false
  }), req.body.password, function(err, user) {
     if (err) {
        return res.status(403).send(err);
     }

     passport.authenticate('local')(req, res, function () {

       var token = jwt.sign(user, secretKey);

       res.status(200).send({
         user: user,
         token: token
       });
     });
  });
});

userRouter.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    var user = req.user;
    var token = jwt.sign(user, secretKey);
    res.redirect('/');

    // res.status(200).json({
    //   user: user,
    //   token: token
    // });
});

userRouter.get('/logout', function(req, res) {
    // req.logout()
    res.send('')
});


module.exports = userRouter;
