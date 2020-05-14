const mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
    general: [Object]
},{versionKey: false});

var Data = mongoose.model('Data', dataSchema, 'data');
module.exports = Data;