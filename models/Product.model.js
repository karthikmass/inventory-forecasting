const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  currentStock: Number,
  minStock: Number,
  maxStock: Number,
  supplierLeadTime: Number // in days
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
