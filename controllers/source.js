const { validationResult } = require('express-validator')
require('dotenv').config();

const Source = require('../models/source');

exports.createSource = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if(!errors.isEmpty()) {
            const error = new Error('Validation failed, entered data is incorrect');
            error.statusCode = 422;
            throw error;
        }
        const name = req.body.name;
        const desc = req.body.desc;
        const accountName = req.body.accountName;
        const link = req.body.link;
        const lastCheckedDate = req.body.lastCheckedDate;
        const source = new Source({
            name: name,
            desc: desc,
            accountName: accountName,
            link: link,
            lastCheckedDate: lastCheckedDate
        })
        await source.save()
        res.status(201).json({
            message: 'Source created successfully',
            source: source
        })
    } catch(err) {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getSources = async (req, res, next) => {
    try {
        const sources = await Source.find();
        res.status(200).json({
            message: 'Fetched sources successfully',
            sources: sources,
        })
    } catch(err) {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getSource = async (req, res, next) => {
    const sourceId = req.params.sourceId;
    try {
        const source = await Source.findById(sourceId);
        if(!source) {
            const error = new Error('Count not find source');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Source fetched.',
            source: source
        })
    } catch(err){
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.updateSource = async (req, res, next) => {
    const sourceId = req.params.sourceId;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error;
    }
    const name = req.body.name;
    const desc = req.body.desc;
    const accountName = req.body.accountType;
    const link = req.body.link;
    const lastCheckedDate = req.body.lastCheckedDate;
    try {
        const source = await Source.findById(sourceId);
        if(!source) {
            const error = new Error('Count not find source');
            error.statusCode = 404;
            throw error;
        }
        source.name = name;
        source.desc = desc;
        source.accountName = accountName;
        source.link = link;
        source.lastCheckedDate = lastCheckedDate;
        const result = await source.save();
        res.status(200).json({
            message: 'Source updated!',
            source: source
        })
    } catch(err){
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}