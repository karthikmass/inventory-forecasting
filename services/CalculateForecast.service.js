const Sale = require("../models/Sale.model");


const calculateAverageSales = async (productId) => {
  const sales = await Sale.aggregate([
    {
      $match: {
        productID:productId,
        date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
    },
    {
      $group: {
        _id: "$productId",
        totalQuantity: { $sum: "$quantitySold" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        averageDailySales: { $divide: ["$totalQuantity", "$count"] },
        totalQuantity: 1,
        count: 1,
      },
    },
  ]);
  console.log(sales, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
  return sales.length > 0 ? sales[0].averageDailySales : 0;
};
const calculateRestocking = async (product) => {
  const avgDailySales = await calculateAverageSales(product._id);
  const daysUntilOutOfStock = product.currentStock / avgDailySales;

  const shouldRestock = daysUntilOutOfStock < product.supplierLeadTime;

  if (shouldRestock) {
    const quantityToOrder = product.maxStock - product.currentStock;
    return { shouldRestock: true, quantityToOrder };
  }

  return { shouldRestock: false, quantityToOrder: 0 };
};

module.exports = {
  calculateAverageSales,
  calculateRestocking,
};
