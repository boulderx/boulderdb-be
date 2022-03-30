const express = require('express');

const router = express.Router();
const videoController = require('../controllers/video');
const isAuth = require('../middleware/isAuth');

router.get('/videoList', isAuth, videoController.getVideos);

router.get('/video/:videoId', isAuth, videoController.getVideo);

router.post('/videoUpload', isAuth, videoController.addVideo);

module.exports = router