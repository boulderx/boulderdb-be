const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    sequence: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum : ['facebook', 'instagram', 'twitter', 'vimeo', 'youtube'],
        required: true,
    },
    name: {
        type: String,
    },
    link: {
        type: String,
    }
});

const climberSchema = new Schema({
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

module.exports = mongoose.model('Climber', climberSchema);