const { validationResult } = require('express-validator')
require('dotenv').config();

const Grade = require('../models/grade');

exports.createGrade = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error;
    }
    const vGrade = req.body.vGrade;
    const fbGrade = req.body.fbGrade;
    const grade = new Grade({
        vGrade: vGrade,
        fbGrade: fbGrade,
    })
    try {
        await grade.save()
        res.status(201).json({
            message: 'Grade created successfully',
            grade: grade
        })
    } catch(err) {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getGrades = async (req, res, next) => {
    try {
        const grades = await Grade.find();
        res.status(200).json({
            message: 'Fetched grades successfully',
            grades: grades,
        })
    } catch(err) {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getGrade = async (req, res, next) => {
    const gradeId = req.params.gradeId;
    try {
        const grade = await Grade.findById(gradeId);
        if(!grade) {
            const error = new Error('Count not find grade');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Grade fetched.',
            grade: grade
        })
    } catch(err){
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.updateGrade = async (req, res, next) => {
    const gradeId = req.params.gradeId;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error;
    }
    const vGrade = req.body.vGrade;
    const fbGrade = req.body.fbGrade;
    try {
        const grade = await Grade.findById(gradeId);
        if(!grade) {
            const error = new Error('Count not find grade');
            error.statusCode = 404;
            throw error;
        }
        grade.vGrade = vGrade;
        grade.fbGrade = fbGrade;
        const result = await grade.save();
        res.status(200).json({
            message: 'Grade updated!',
            grade: result
        })
    } catch(err){
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteGrade = async (req, res, next) => {
    const gradeId = req.params.gradeId;
    try {
        const result = await Grade.findByIdAndRemove(gradeId);
        res.status(200).json({
            message: 'Deleted grade.'
        })
    } catch (err) {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }

}
