const { validationResult } = require('express-validator')
require('dotenv').config();

const Boulder = require('../models/boulder');

exports.createBoulder = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if(!errors.isEmpty()) {
            const error = new Error('Validation failed, entered data is incorrect');
            error.statusCode = 422;
            throw error;
        }
        const name = req.body.name;
        const desc = req.body.desc;
        const lat = req.body.lat;
        const long = req.body.long;
        const firstClimber = req.body.firstClimber || null;
        const area = req.body.area || null;
        const grade = req.body.grade || null;
        const found = req.body.found;
        const wayDesc = req.body.wayDesc;
        const firstAscentDate = req.body.firstAscentDate;
        const boulder = new Boulder({
            name: name,
            desc: desc,
            wayDesc: wayDesc,
            lat: lat,
            long: long,
            firstClimber: firstClimber,
            area: area,
            grade: grade,
            found: found,
            firstAscentDate: firstAscentDate
        })
        await boulder.save()
        res.status(201).json({
            message: 'Boulder created successfully',
            boulder: boulder
        })
    } catch(err) {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getBoulders = async (req, res, next) => {
    try {
        const boulders = await Boulder.find().populate(['area', 'grade']);
        res.status(200).json({
            message: 'Fetched boulders successfully',
            boulders: boulders.map(boulder => ({
                ...boulder._doc,
                area: boulder?.area?.name,
                grade: boulder?.grade?.fbGrade,
            })),
        })
    } catch(err) {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getBoulder = async (req, res, next) => {
    const boulderId = req.params.boulderId;
    try {
        const boulder = await Boulder.findById(boulderId);
        if(!boulder) {
            const error = new Error('Count not find boulder');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Boulder fetched.',
            boulder: boulder
        })
    } catch(err){
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.updateBoulder = async (req, res, next) => {
    const boulderId = req.params.boulderId;
    const errors = validationResult(req);
    try {
        if(!errors.isEmpty()) {
            const error = new Error('Validation failed, entered data is incorrect');
            error.statusCode = 422;
            throw error;
        }
        const name = req.body.name;
        const desc = req.body.desc;
        const lat = req.body.lat;
        const long = req.body.long;
        const firstClimber = req.body.firstClimber;
        const area = req.body.area;
        const grade = req.body.grade;
        const found = req.body.found;
        const wayDesc = req.body.wayDesc;
        const firstAscentDate = req.body.firstAscentDate;
        const boulder = await Boulder.findById(boulderId);
        if(!boulder) {
            const error = new Error('Could not find boulder');
            error.statusCode = 404;
            throw error;
        }
        boulder.name = name;
        boulder.desc = desc;
        boulder.wayDesc = wayDesc;
        boulder.lat = lat;
        boulder.long = long;
        boulder.firstClimber = firstClimber;
        boulder.grade = grade;
        boulder.area = area;
        boulder.found = found;
        boulder.firstAscentDate = firstAscentDate;
        const result = await boulder.save();
        res.status(200).json({
            message: 'Boulder updated!',
            boulder: result
        })
    } catch(err){
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/*exports.deleteBoulder = async (req, res, next) => {
    const areaId = req.params.areaId;
    try {
        const result = await Area.findByIdAndRemove(areaId);
        res.status(200).json({
            message: 'Deleted area.'
        })
    } catch (err) {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }

}*/

exports.addPicture = async (req, res, next) => {
    const boulderId = req.body.boulderId;
    try {
        if(!req.file) {
            const error = new Error('No image provided');
            error.statusCode = 422;
            throw error;
        }
        const boulder = await Boulder.findById(boulderId);
        if(!boulder) {
            const error = new Error('Count not find boulder');
            error.statusCode = 404;
            throw error;
        }
        const imageUrl = req.file.path;
        boulder.imageUrls.push(imageUrl);
        const updatedBoulder = await boulder.save();
        res.status(200).json({
            message: 'Picture added!',
            boulder: updatedBoulder
        })
    } catch (err) {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}