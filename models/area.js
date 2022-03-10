const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const areaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    wayDesc: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Area', areaSchema);