const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const firstClimberController = require('../controllers/firstClimber');
const isAuth = require('../middleware/isAuth');
const gradeController = require("../controllers/grade");

router.post('/firstClimber', isAuth, [
    body('firstName')
        .trim()
        .not()
        .isEmpty(),
    body('lastName')
        .trim()
        .not()
        .isEmpty(),
], firstClimberController.createClimber);

module.exports = router;