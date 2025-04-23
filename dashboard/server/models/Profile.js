const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: String, 
        required: true,
    }
}, {
  timestamps: true, 
});

module.exports = mongoose.model('Profile', profileSchema);
