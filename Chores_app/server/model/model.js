const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        unique: true //all tasks should be unique
    },
    difficulty: String,
})

const Taskdb = mongoose.model('taskdb', schema);

module.exports = Taskdb;