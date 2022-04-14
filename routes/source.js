const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const sourceController = require('../controllers/source');
const isAuth = require('../middleware/isAuth');

router.post('/source', isAuth, [
    body('name')
        .trim()
        .not()
        .isEmpty(),
    body('lastCheckedDate')
        .not()
        .isEmpty()
], sourceController.createSource);

router.get('/sources', isAuth, sourceController.getSources);

router.get('/source/:sourceId', isAuth, sourceController.getSource);

router.put('/source/:sourceId', isAuth, [
    body('name')
    .trim()
    .not()
    .isEmpty(),
    body('lastCheckedDate')
        .not()
        .isEmpty()
], sourceController.updateSource);

module.exports = router