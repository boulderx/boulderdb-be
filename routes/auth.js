const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');

const router = express.Router();
const authController = require('../controllers/auth');

router.put('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, {req}) => {
            return User.findOne({email: value})
                .then(userDoc => {
                    if(userDoc) {
                        return Promise.reject('E-Mail address already exists!');
                    }
                })
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({min: 5}),
    body('confirmPassword')
        .trim()
        .custom((value, {req}) => {
            if(value !== req.body.password){
                throw new Error('Passwords do not match')
            }
            return true;
        })
], authController.signup);

router.post('/login', [
    body('email')
        .not()
        .isEmpty(),
    body('password')
        .not()
        .isEmpty()
], authController.login);

module.exports = router;