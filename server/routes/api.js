var express = require('express');
const passport = require('passport');
var router = express.Router();
var usersModel = require('../config/models/user')
const {genPassword}= require('../lib/passwordUtils')
const isAuth = require('./authMiddleware')



// POST ROUTES

router.post('/',passport.authenticate('local',{failureRedirect:'/login-failure',successRedirect:'/play'}),(req,res)=>{});//------------------

router.post('/register',(req,res,next)=>{
  const saltHash=genPassword(req.body.pass);
  const salt=saltHash.salt;
  const hash=saltHash.hash;

  const newUser = new usersModel({
    username:req.body.uname,
    salt:salt,
    hash:hash
  });
  newUser.save().then((user)=>{console.log('new user created')});
  // res.redirect('/login');//---------------------------
  res.json({ message: 'Registration successful' });
});

// get routes

router.get('/play',(req,res,next)=>{
  isAuth(req,res,next).then(()=>{
    res.json({ message: 'playing successfuly' });
  })
  // res.render('../../client/src/components/Todo.js');//------------
})


// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
  req.logout();
  // res.redirect('/login');
  res.json({ message: 'logged out successful' });
});


router.get('/login-failure', (req, res, next) => {
  res.json({ message:'You entered the wrong password.'});
});


module.exports = router;