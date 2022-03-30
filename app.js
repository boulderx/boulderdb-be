const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const multer = require('multer');
const path = require('path');

const app = express();

const authRoutes = require('./routes/auth');
const gradeRoutes = require('./routes/grade');
const climberRoutes = require('./routes/climber');
const areaRoutes = require('./routes/area');
const boulderRoutes = require('./routes/boulder');
const videoRoutes = require('./routes/video');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, 'videos')
        }
        cb(null, 'videos');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'video/x-msvideo' ||
        file.mimetype === 'video/mpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(bodyParser.json());
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/videos', express.static(path.join(__dirname, 'videos')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/auth', authRoutes);
app.use('', gradeRoutes);
app.use('', climberRoutes);
app.use('', areaRoutes);
app.use('', boulderRoutes);
app.use('', videoRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data
    });
})

mongoose.connect(process.env.MONGODB_URI)
    .then(result => {
        app.listen(process.env.PORT);
    })
    .catch(err => {
        console.log(err);
    });