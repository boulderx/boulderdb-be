const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const gradeController = require('../controllers/grade');
const isAuth = require('../middleware/isAuth');

router.post('/grade', isAuth, [
    body('vGrade')
        .trim()
        .not()
        .isEmpty(),
    body('fbGrade')
        .trim()
        .not()
        .isEmpty(),
], gradeController.createGrade);

router.get('/grades', isAuth, gradeController.getGrades);

router.get('/grade/:gradeId', isAuth, gradeController.getGrade);

router.put('/grade/:gradeId', isAuth, gradeController.updateGrade);

router.delete('/grade/:gradeId', isAuth, gradeController.deleteGrade);

module.exports = router