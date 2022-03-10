const { validationResult } = require('express-validator')
require('dotenv').config();

const Area = require('../models/area');

exports.createArea = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if(!errors.isEmpty()) {
            const error = new Error('Validation failed, entered data is incorrect');
            error.statusCode = 422;
            throw error;
        }
        const name = req.body.name;
        const desc = req.body.desc;
        const wayDesc = req.body.wayDesc;
        const area = new Area({
            name: name,
            desc: desc,
            wayDesc: wayDesc
        })
        await area.save()
        res.status(201).json({
            message: 'Area created successfully',
            grade: area
        })
    } catch(err) {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getAreas = async (req, res, next) => {
    try {
        const areas = await Area.find();
        res.status(200).json({
            message: 'Fetched grades successfully',
            areas: areas,
        })
    } catch(err) {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getArea = async (req, res, next) => {
    const areaId = req.params.areaId;
    try {
        const area = await Area.findById(areaId);
        if(!area) {
            const error = new Error('Count not find area');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Area fetched.',
            area: area
        })
    } catch(err){
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.updateArea = async (req, res, next) => {
    const areaId = req.params.areaId;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error;
    }
    const name = req.body.name;
    const desc = req.body.desc;
    const wayDesc = req.body.wayDesc;
    try {
        const area = await Area.findById(areaId);
        if(!area) {
            const error = new Error('Count not find area');
            error.statusCode = 404;
            throw error;
        }
        area.name = name;
        area.desc = desc;
        area.wayDesc = wayDesc;
        const result = await area.save();
        res.status(200).json({
            message: 'Area updated!',
            area: result
        })
    } catch(err){
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteArea = async (req, res, next) => {
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

}