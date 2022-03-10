const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const areaController = require('../controllers/area');
const isAuth = require('../middleware/isAuth');

router.post('/area', isAuth, [
    body('name')
        .trim()
        .not()
        .isEmpty(),
], areaController.createArea);

router.get('/areas', isAuth, areaController.getAreas);

router.get('/area/:areaId', isAuth, areaController.getArea);

router.put('/area/:areaId', [
    body('name')
        .trim()
        .not()
        .isEmpty(),
], isAuth, areaController.updateArea);

module.exports = router