
const Video = require('../models/video');

exports.addVideo = async (req, res, next) => {
    const boulderIds = req.body.boulders.split(',');
    const name = req.body.name;
    const desc = req.body.desc;
    try {
        if(!name) {
            const error = new Error('No name provided');
            error.statusCode = 422;
            throw error;
        }
        if(!req.file) {
            const error = new Error('No video provided');
            error.statusCode = 422;
            throw error;
        }
        const videoUrl = req.file.path;
        const video = new Video({
            name: name,
            desc: desc,
            fileUrl: videoUrl,
            boulders: boulderIds
        });
        await video.save();
        res.status(201).json({
            message: 'Video added successfully',
            video: video
        })
    } catch(err) {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getVideos = async (req, res, next) => {
    try {
        const videos = await Video.find();
        res.status(200).json({
            message: 'Fetched videos successfully',
            videos: videos.map(video => ({
                ...video._doc,
            })),
        })
    } catch(err) {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getVideo = async (req, res, next) => {
    const videoId = req.params.videoId;
    try {
        const video = await Video.findById(videoId).populate(['boulders']);
        if(!video) {
            const error = new Error('Count not find video');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Video fetched.',
            video: video
        })
    } catch(err){
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.updateVideo = async (req, res, next) => {
    const videoId = req.params.videoId;
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const boulderIds = req.body.boulders.split(',');
        const video = await Video.findById(videoId);
        if(!video) {
            const error = new Error('Could not find video');
            error.statusCode = 404;
            throw error;
        }
        video.name = name;
        video.desc = desc;
        video.boulders = boulderIds;
        const result = await video.save();
        res.status(200).json({
            message: 'Video updated!',
            video: result
        })
    } catch(err){
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}