const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    fileUrl: {
        type: String
    },
    boulders: [{
        type: Schema.Types.ObjectId,
        ref: 'Boulder'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Video', videoSchema);