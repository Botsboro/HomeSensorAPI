var mongoose = require('mongoose');

// Define the schema
var ReadingSchema = new mongoose.Schema({
    sensor: String,
    value: Number,
    room: String,
    location: { type: {type: String}, coordinates: [ ] },
    recordedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reading', ReadingSchema);