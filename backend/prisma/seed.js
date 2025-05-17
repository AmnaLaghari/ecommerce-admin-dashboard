const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const product1 = await prisma.product.create({
    data: {
      name: 'Classic T-Shirt',
      description: 'Comfortable cotton t-shirt',
      price: 19.99,
      stock: 100,
      images: 'https://res.cloudinary.com/dhpvcyibe/image/upload/v1747305187/classic_t_shirt_xmk7ba.jpg',
      category: "Men's Fashion"
    }
  })

  const product2 = await prisma.product.create({
    data: {
      name: 'Wireless Headphones',
      description: 'Noise cancelling over-ear headphones',
      price: 149.99,
      stock: 50,
      images: 'https://res.cloudinary.com/dhpvcyibe/image/upload/v1747305208/wireless_headphones_ms8izc.jpg',
      category: 'Electronics'
    }
  })

  const product3 = await prisma.product.create({
    data: {
      name: 'Blender',
      description: 'High-speed kitchen blender',
      price: 89.99,
      stock: 30,
      images: 'https://res.cloudinary.com/dhpvcyibe/image/upload/v1747305218/blender_lao3ys.jpg',
      category: 'Home and kitchen'
    }
  })

  const product4 = await prisma.product.create({
    data: {
      name: 'Wireless Earbuds',
      description: 'Noise-cancelling Bluetooth earbuds',
      price: 129.99,
      stock: 50,
      images: 'https://res.cloudinary.com/dhpvcyibe/image/upload/v1747400466/wireless_earbuds_doj0bk.jpg',
      category: 'Electronics'
    }
  })

  const product5 = await prisma.product.create({
    data: {
      name: 'Yoga Mat',
      description: 'Eco-friendly non-slip yoga mat',
      price: 39.99,
      stock: 60,
      images: 'https://res.cloudinary.com/dhpvcyibe/image/upload/v1747400501/yoga_mat_lahhoa.jpg',
      category: 'Health'
    }
  })

  const product6 = await prisma.product.create({
    data: {
      name: 'Smartwatch',
      description: 'Fitness tracking smartwatch with heart rate monitor',
      price: 199.99,
      stock: 40,
      images: 'https://res.cloudinary.com/dhpvcyibe/image/upload/v1747400530/smart_watch_ckixzf.jpg',
      category: 'Electronics'
    }
  })

  const product7 = await prisma.product.create({
    data: {
      name: 'Cotton Bedsheet Set',
      description: 'Luxury queen-size bedsheets (3-piece set)',
      price: 59.99,
      stock: 25,
      images: 'https://res.cloudinary.com/dhpvcyibe/image/upload/v1747400547/cotton_bedsheet_rhyof2.jpg',
      category: 'Home and kitchen'
    }
  })

  const product8 = await prisma.product.create({
    data: {
      name: 'Denim Jacket',
      description: 'Classic blue denim jacket for men',
      price: 74.99,
      stock: 35,
      images: 'https://res.cloudinary.com/dhpvcyibe/image/upload/v1747400569/denim_jacket_oqoct7.jpg',
      category: "Men's Fashion"
    }
  })

  const today = new Date()

  const { PrismaClient } = require('@prisma/client');

  const products = [product1, product2, product3, product4, product5, product6, product7, product8];
  let buyerIdCounter = 1000;

  function getRandomProduct() {
    return products[Math.floor(Math.random() * products.length)];
  }

  function generateRandomItems() {
    const numberOfItems = Math.floor(Math.random() * 3) + 1;
    const used = new Set();

    return Array.from({ length: numberOfItems }).map(() => {
      let product;
      do {
        product = getRandomProduct();
      } while (used.has(product.id));
      used.add(product.id);

      return {
        productId: product.id,
        quantity: Math.floor(Math.random() * 4) + 1,
        price: product.price
      };
    });
  }

  function generateDateOrders() {
    const orders = [];
    const startDate = new Date('2025-04-07');
    const endDate = new Date('2025-04-30');

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const orderCount = Math.floor(Math.random() * 2) + 4;  

      for (let i = 0; i < orderCount; i++) {
        orders.push({
          data: {
            buyerId: buyerIdCounter++,
            createdAt: new Date(date),
            orderItems: {
              create: generateRandomItems()
            }
          }
        });
      }
    }

    return orders;
  }

  async function seedAllOrders() {
    const orderData = generateDateOrders();

    await prisma.$transaction(
      orderData.map((order) => prisma.order.create(order))
    );

    console.log('✅ All orders seeded with nested items.');
  }

  seedAllOrders()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });



  await prisma.dailyTraffic.createMany({
    data: [
      { date: new Date('2025-04-01'), visitors: 89 },
      { date: new Date('2025-04-02'), visitors: 45 },
      { date: new Date('2025-04-03'), visitors: 67 },
      { date: new Date('2025-04-04'), visitors: 50 },
      { date: new Date('2025-04-05'), visitors: 100 },
      { date: new Date('2025-04-06'), visitors: 98 },
      { date: new Date('2025-04-07'), visitors: 48 },
      { date: new Date('2025-04-08'), visitors: 78 },
      { date: new Date('2025-04-09'), visitors: 50 },
      { date: new Date('2025-04-10'), visitors: 87 },
      { date: new Date('2025-04-11'), visitors: 100 },
      { date: new Date('2025-04-12'), visitors: 45 },
      { date: new Date('2025-04-13'), visitors: 67 },
      { date: new Date('2025-04-14'), visitors: 89 },
      { date: new Date('2025-04-15'), visitors: 96 },
      { date: new Date('2025-04-16'), visitors: 60 },
      { date: new Date('2025-04-17'), visitors: 70 },
      { date: new Date('2025-04-18'), visitors: 80 },
      { date: new Date('2025-04-19'), visitors: 90 },
      { date: new Date('2025-04-20'), visitors: 57 },
      { date: new Date('2025-04-21'), visitors: 60 },
      { date: new Date('2025-04-22'), visitors: 70 },
      { date: new Date('2025-04-23'), visitors: 80 },
      { date: new Date('2025-04-24'), visitors: 68 },
      { date: new Date('2025-04-25'), visitors: 67 },
      { date: new Date('2025-04-26'), visitors: 100 },
      { date: new Date('2025-04-27'), visitors: 67 },
      { date: new Date('2025-04-28'), visitors: 78 },
      { date: new Date('2025-04-29'), visitors: 82 },
      { date: new Date('2025-04-30'), visitors: 91 },
    ]
  })

  console.log('Seed data created successfully!')

  const { updateAvgDailySalesForAllProducts } = require('../scripts/updateAvgDailySales')
  await updateAvgDailySalesForAllProducts()
  console.log('✅ avgDailySales updated for all products.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
