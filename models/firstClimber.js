const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    type: {
        type: String,
        enum : ['facebook', 'instagram', 'twitter', 'vimeo', 'youtube'],
        required: true,
    },
    accountName: {
        type: String,
    },
    link: {
        type: String,
        required: true
    }
});

const firstClimberSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    media: [
        mediaSchema
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('FirstClimber', firstClimberSchema);