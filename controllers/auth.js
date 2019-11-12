const bcrypt = require('bcryptjs')
const User = require('../models/user')

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn
  })
};

exports.postLogin = (req, res, next) => {
  User.findById('5dc534f0961ffa1cf50e681c')
  .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        res.redirect('/');
      })
    })
    .catch(err => console.log(err)); 
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({email: email})
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hasdedPassword => {
          const user = new User({
            email: email,
            password: hasdedPassword,
            cart: { items: [] }
          })
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};
