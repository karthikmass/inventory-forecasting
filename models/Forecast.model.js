const mongoose = require('mongoose');

const forecastSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  forecastDate: Date,
  forecastedStockLevel: Number,
  restockingRecommendation: {
    shouldRestock: Boolean,
    quantityToOrder: Number
  }
});

const Forecast = mongoose.model('Forecast', forecastSchema);
module.exports = Forecast;

