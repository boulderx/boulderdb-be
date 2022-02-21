const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    vGrade: {
        type: String,
        required: true
    },
    fbGrade: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Grade', gradeSchema);