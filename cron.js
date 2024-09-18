const cron = require("node-cron");
const connection = require("./config/coneection");
const Forecast = require("./models/Forecast.model");
const {
  calculateAverageSales,
  calculateRestocking,
} = require("./services/CalculateForecast.service");
const Product = require("./models/Product.model");

cron.schedule("0 0 * * *", async () => {
  const products = await Product.find();
  for (let product of products) {
    const { shouldRestock, quantityToOrder } = await calculateRestocking(
      product
    );

    const forecastedStockLevel =
      product.currentStock - (await calculateAverageSales(product._id));
    await Forecast.create({
      productId: product._id,
      forecastDate: new Date(),
      forecastedStockLevel,
      restockingRecommendation: { shouldRestock, quantityToOrder },
    });

    if (shouldRestock) {
      console.log(
        `Restocking needed for product ${product.name}. Order ${quantityToOrder} units.`
      );
    } else {
      console.log(
        `Restocking not needed for product ${product.name}. Order ${quantityToOrder} units.`
      );
    }
  }
});
// schedule()
