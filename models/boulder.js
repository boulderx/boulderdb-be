const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boulderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    wayDescription: {
        type: String
    },
    firstClimber: {
        type: Schema.Types.ObjectId,
        ref: 'FirstClimber',
        required: true
    },
    grade: {
        type: Schema.Types.ObjectId,
        ref: 'Grade',
        required: true
    },
    area: {
        type: Schema.Types.ObjectId,
        ref: 'Area',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Boulder', boulderSchema);