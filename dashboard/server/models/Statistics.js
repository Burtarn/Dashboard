const mongoose = require('mongoose');

const StatisticSchema = new mongoose.Schema({
  date: { type: String, required: true },
  month: { type: String, required: true },
  revenue: { type: Number, required: true },
  estimated: { type: Number, required: true },
  productsSold: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Statistic', StatisticSchema);
