const { connect } = require('./config/dbDetails');

async function seed() {
  const db = await connect();

  const products = [
    {
      productID: 'P001',
      name: 'Product 1',
      currentStock: 50,
      minStock: 20,
      maxStock: 100,
      supplierLeadTimeDays: 5,
    },
    {
      productID: 'P002',
      name: 'Product 2',
      currentStock: 30,
      minStock: 10,
      maxStock: 80,
      supplierLeadTimeDays: 3,
    },
  ];

  const sales = [
    { date: new Date('2024-09-01'), productID: '66ea2e5bcb6de59e5fa8eed7', quantitySold: 50 },
    { date: new Date('2024-09-02'), productID: '66ea2e5bcb6de59e5fa8eed7', quantitySold: 10 },
    { date: new Date('2024-09-01'), productID: '66ea2e5bcb6de59e5fa8eed8', quantitySold: 2 },
    { date: new Date('2024-09-02'), productID: '66ea2e5bcb6de59e5fa8eed8', quantitySold: 4 },
    { date: new Date('2024-08-19'), productID: '66ea2e5bcb6de59e5fa8eed7', quantitySold: 50 },
    { date: new Date('2024-08-20'), productID: '66ea2e5bcb6de59e5fa8eed7', quantitySold: 10 },
    { date: new Date('2024-08-19'), productID: '66ea2e5bcb6de59e5fa8eed8', quantitySold: 2 },
    { date: new Date('2024-08-23'), productID: '66ea2e5bcb6de59e5fa8eed8', quantitySold: 4 },
    { date: new Date('2024-08-17'), productID: '66ea2e5bcb6de59e5fa8eed7', quantitySold: 50 },
    { date: new Date('2024-08-18'), productID: '66ea2e5bcb6de59e5fa8eed7', quantitySold: 10 },
    { date: new Date('2024-08-17'), productID: '66ea2e5bcb6de59e5fa8eed8', quantitySold: 2 },
    { date: new Date('2024-08-18'), productID: '66ea2e5bcb6de59e5fa8eed8', quantitySold: 4 },
  ];

  // Clear existing data
  await db.collection('products').deleteMany({});
  await db.collection('sales').deleteMany({});

  // Insert new data
  await db.collection('products').insertMany(products);
  await db.collection('sales').insertMany(sales);

  console.log('Data seeded successfully');
}

seed()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error seeding data:', err);
    process.exit(1);
  });
