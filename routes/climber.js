const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const climberController = require('../controllers/climber');
const isAuth = require('../middleware/isAuth');

router.post('/climber', isAuth, [
    body('firstName')
        .trim()
        .not()
        .isEmpty(),
    body('lastName')
        .trim()
        .not()
        .isEmpty(),
], climberController.createClimber);

router.get('/climbers', isAuth, climberController.getClimbers);

router.get('/climber/:climberId', isAuth, climberController.getClimber);

router.put('/climber/:climberId', isAuth, [
    body('firstName')
        .trim()
        .not()
        .isEmpty(),
    body('lastName')
        .trim()
        .not()
        .isEmpty(),
], climberController.updateClimber);

module.exports = router;