const { validationResult } = require('express-validator')

const FirstClimber = require('../models/firstClimber');

exports.createClimber = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error;
    }
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const media = req.body.media;
    const firstClimber = new FirstClimber({
        firstName: firstName,
        lastName: lastName,
        media: media
    })
    try {
        await firstClimber.save()
        res.status(201).json({
            message: 'first climber created successfully',
            firstClimber: firstClimber
        })
    } catch(err) {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}