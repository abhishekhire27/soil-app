// Import necessary modules and initialize the app
const request = require('supertest');
const db = require('../config').default;
const app = require('../../server');
const { seed } = require('../seeders/seedTestData');

// Set Jest timeout to 30 seconds
jest.setTimeout(30000);

// Initialize user objects to store data fetched from the database
let user1 = {};
let user2 = {};

// Before all tests, synchronize the database, seed test data, and fetch test users
beforeAll(async () => {
    await db.sequelize.sync();
    await seed();
    user1 = await db.user.findOne({ where: { emailId: 'testuser1@example.com' } });
    user2 = await db.user.findOne({ where: { emailId: 'testuser2@example.com' } });
});

// After all tests, clean up the database by deleting test data
afterAll(async () => {
    if (user1) {
        const cartId1 = user1.cartId;
        await db.cartItems.destroy({ where: { cartId: cartId1 } });
        await db.cart.destroy({ where: { cartId: cartId1 } });
        await db.user.destroy({ where: { emailId: 'testuser1@example.com' } });
    }

    if (user2) {
        const cartId2 = user2.cartId;
        await db.cartItems.destroy({ where: { cartId: cartId2 } });
        await db.cart.destroy({ where: { cartId: cartId2 } });
        await db.user.destroy({ where: { emailId: 'testuser2@example.com' } });
    }

    await db.sequelize.close();
});

// Test the /emptyCart endpoint
describe('POST /emptyCart', () => {

    // Test case for successfully emptying the cart
    it('should empty the cart successfully', async () => {
        const res = await request(app)
            .post('/emptyCart')
            .send({ cartId: user1.cartId })
            .expect(200);

        expect(res.body).toHaveProperty('message', 'Cart emptied successfully');

        const remainingItems = await db.cartItems.findAll({ where: { cartId: user1.cartId } });
        expect(remainingItems).toHaveLength(0);
    });
});

// Test the /getCartItems endpoint
describe('GET /getCartItems', () => {
    it('should retrieve items from the cart successfully', async () => {
        // Seed the cart items and corresponding items
        await db.cartItems.bulkCreate([
            { cartId: user1.cartId, itemId: 1, quantity: 2, userId: user1.userId },
            { cartId: user1.cartId, itemId: 2, quantity: 1, userId: user1.userId }
        ]);
        const res = await request(app)
            .get('/getCartItems')
            .query({ cartId: user1.cartId })
            .expect(200);

        expect(res.body).toHaveLength(2);
        expect(res.body[0]).toMatchObject({
            itemId: 1,
            name: "Organic Raw Honey (1L)",
            image: "/assets/items/Honey.jpg",
            price: 10,
            description: "Unfiltered and unpasteurized, preserving all the natural vitamins and enzymes for a sweet, healthy treat.",
            specialDays: [0, 4],
            specialPrice: 8
        });
        expect(res.body[1]).toMatchObject({
            itemId: 2,
            name: "Organic Turmeric Powder (250gm)",
            image: "/assets/items/Turmeric.jpg",
            price: 3,
            description: "Known for its anti-inflammatory properties, this spice adds vibrant color and flavor to any dish.",
            specialDays: [1, 3, 5],
            specialPrice: 2
        });
    });
});

// Test the /addToCart endpoint
describe('POST /addToCart', () => {
    // Test case for successfully adding items to the cart
    it('should add items to the cart successfully', async () => {
        const itemsToAdd = [
            { cartId: user1.cartId, itemId: 1, quantity: 1, userId: user1.userId },
            { cartId: user1.cartId, itemId: 2, quantity: 2, userId: user1.userId }
        ];

        const res = await request(app)
            .post('/addToCart')
            .send(itemsToAdd)
            .expect(200);

        expect(res.body).toHaveProperty('message', 'Items added successfully');
    });
});
