const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    fbGrade: {
        type: String,
        required: true
    },
    vGrade: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Grade', gradeSchema);