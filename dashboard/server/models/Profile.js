const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: false
    },
    name: {
    type: String,
    required: true
    },
    startDate: {
    type: String,
    required: true
}
});

module.exports = mongoose.model('Profile', profileSchema);
