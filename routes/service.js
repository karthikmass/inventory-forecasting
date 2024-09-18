const express = require("express");
const Forecast = require("../models/Forecast.model");
const Product = require("../models/Product.model");
const {
  calculateAverageSales,
} = require("../services/CalculateForecast.service");
var router = express.Router();

router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get("/products/:id/forecast", async (req, res) => {
  const forecasts = await Forecast.find({ productId: req.params.id });
  res.json(forecasts);
});

router.get("/products/:id/sales-trend", async (req, res) => {
  const avgSales = await calculateAverageSales(req.params.id);
  res.json({ averageDailySales: avgSales });
});

module.exports = router;
