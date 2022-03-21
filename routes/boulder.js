const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const boulderController = require('../controllers/boulder');
const isAuth = require('../middleware/isAuth');

router.post('/boulder', isAuth, [
    body('name')
        .trim()
        .not()
        .isEmpty(),
], boulderController.createBoulder);

router.get('/boulders', isAuth, boulderController.getBoulders);

router.post('/boulder/pictureUpload', isAuth, boulderController.addPicture);

router.get('/boulder/:boulderId', isAuth, boulderController.getBoulder);

router.put('/boulder/:boulderId', [
    body('name')
        .trim()
        .not()
        .isEmpty(),
], isAuth, boulderController.updateBoulder);

module.exports = router