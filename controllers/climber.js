const { validationResult } = require('express-validator')

const Climber = require('../models/climber');

exports.createClimber = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if(!errors.isEmpty()) {
            const error = new Error('Validation failed, entered data is incorrect');
            error.statusCode = 422;
            throw error;
        }
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const media = req.body.media;
        const climber = new Climber({
            firstName: firstName,
            lastName: lastName,
            media: media
        })
        await climber.save()
        res.status(201).json({
            message: 'climber created successfully',
            climber: climber
        })
    } catch(err) {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getClimbers = async (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalItems;
    try {
        const climberCount = await Climber.find()
            .countDocuments();
        totalItems = climberCount;
        const climbers = await Climber.find()
            //.skip((currentPage - 1) * perPage)
            //.limit(perPage)
        res.status(200).json({
            message: 'Fetched climbers successfully',
            climbers: climbers,
            totalItems: totalItems
        })
    } catch(err) {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getClimber = async (req, res, next) => {
    const climberId = req.params.climberId;
    try {
        const climber = await Climber.findById(climberId);
        if(!climber) {
            const error = new Error('Count not find climber');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Climber fetched.',
            climber: climber
        })
    } catch(err) {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.updateClimber = async (req, res, next) => {
    const climberId = req.params.climberId;
    const errors = validationResult(req);
    try {
        if(!errors.isEmpty()) {
            const error = new Error('Validation failed, entered data is incorrect');
            error.statusCode = 422;
            throw error;
        }
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const media = req.body.media;
        const climber = await Climber.findById(climberId);
        if(!climber) {
            const error = new Error('Count not find climber');
            error.statusCode = 404;
            throw error;
        }
        climber.firstName = firstName;
        climber.lastName = lastName;
        climber.media = media;
        await climber.save();
        res.status(200).json({
            message: 'Climber updated!',
            climber: climber
        })
    } catch(err) {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}