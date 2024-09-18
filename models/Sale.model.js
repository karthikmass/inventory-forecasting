
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  date: Date,
  quantitySold: Number
});

const Sale = mongoose.model('Sale', saleSchema);
module.exports = Sale;
