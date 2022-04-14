const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sourceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    accountName: {
        type: String
    },
    link: {
        type: String
    },
    lastCheckedDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Source', sourceSchema);