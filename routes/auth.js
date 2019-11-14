const express = require('express');
const { check, body } = require('express-validator/check');
const authController = require('../controllers/auth')
const router = express.Router();

router.get('/login', authController.getLogin)
router.get('/signup', authController.getSignup)
router.post('/login', authController.postLogin)
router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, {req}) => {
        if (value === 'dummy@dummy.dum') {
          throw new Error('This dummy is only for test custom validation.')
        } else {
          return true;
        }
      }),
    body(
      'password',
      'Please enter a password with only numbers and text at least 5 characters.'
      )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body('confirmPassword')
      .custom((value, {req}) => {
        if (value !== req.body.password) {
          throw new Error('Password have to match!')
        } else {
          return true;
        }
      })
  ]
  , authController.postSignup);
router.post('/logout', authController.postLogout)
router.get('/reset', authController.getReset)
router.post('/reset', authController.postReset)
router.get('/reset/:token', authController.getNewPassword)
router.post('/new-password', authController.postNewPassword)

module.exports = router;
