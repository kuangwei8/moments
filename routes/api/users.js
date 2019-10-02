const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//@route Post api/users/register
//@desc Register a user
//@access Public
router.post('\register', (req,res) => {
  const {errors, isValid} = validateRegisterInput(req.body);

  if (!isValid){
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email})
  .then (user => {
    if (user) {
      errors.email = "Email already exists";
    return res.status(400).json(errors)
    } else {
      const avatar = gravatar.url(req.body.email, {
        s:'200',
        r:'pg',
        d:'mm'
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10,(err,salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password,salt,(err,hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
          .save()
          .then(user => res.json (user))
          .catch (err => console.log(err));
        });
      });
    }
  }).catch(err => console.log (err));
});

// @route Post api/users/current
// @desc return current user
// @access Private
router.get('/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email,
      name: req.user.name
    });
  });
module.exports = router;
