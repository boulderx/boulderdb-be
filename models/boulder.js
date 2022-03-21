const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boulderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    wayDesc: {
        type: String
    },
    lat: {
        type: String
    },
    long: {
        type: String
    },
    found: {
        type: Boolean
    },
    firstAscentDate: {
        type: Date
    },
    firstClimber: {
        type: Schema.Types.ObjectId,
        ref: 'Climber'
    },
    grade: {
        type: Schema.Types.ObjectId,
        ref: 'Grade'
    },
    area: {
        type: Schema.Types.ObjectId,
        ref: 'Area'
    },
    imageUrls: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Boulder', boulderSchema);