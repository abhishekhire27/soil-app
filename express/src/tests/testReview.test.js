// Import necessary modules
const request = require('supertest');
const argon2 = require('argon2');
const app = require('../../server');

// Mock the database configuration
jest.mock('../config', () => {
    const SequelizeMock = require('sequelize-mock'); // Move SequelizeMock import inside the mock function

    const dbMock = new SequelizeMock(); // Create a new instance of SequelizeMock

    // Define mock models
    const UserMock = dbMock.define('user', {
        userId: '1',
        name: 'A',
        emailId: 'testuser1@example.com',
        password_hashed: 'hashedPassword',
        joiningDate: new Date(),
        cartId: '1',
        userStatus: 'ACTIVE'
    });

    const ReviewMock = dbMock.define('review', {
        reviewId: '1',
        content: 'Great product!',
        rating: 5
    });

    const CartMock = dbMock.define('cart', { cartId: '1' });

    const CartItemsMock = dbMock.define('cartItems', { cartId: '1', itemId: '3', quantity: 2, userId: '1' });

    return {
        default: {
            user: UserMock,
            review: ReviewMock,
            cart: CartMock,
            cartItems: CartItemsMock
        }
    };
});

const db = require('../config').default; // Import the mocked db after jest.mock

let server;
let hashedPassword;
let user1;
let cart1;

beforeAll(async () => {
    // Use a different port for testing to avoid conflicts
    const PORT = 4002;
    server = app.listen(PORT);

    hashedPassword = await argon2.hash('password', { type: argon2.argon2id });
    cart1 = await db.cart.create();
    user1 = await db.user.create({
        name: "A",
        emailId: 'testuser1@example.com',
        password_hashed: hashedPassword,
        joiningDate: new Date(),
        cartId: cart1.cartId,
        userStatus: 'ACTIVE',
    });
});

afterAll(async () => {
    await server.close();
});

let newReviewData = {};

describe('POST /saveReview', () => {
    it('should create a new review successfully', async () => {
        newReviewData = {
            content: 'Amazing product!',
            rating: 5,
            itemId: 1,
            userId: user1.userId // Use the userId of the test user
        };

        const res = await request(app)
            .post('/api/review/save')
            .send(newReviewData)
            .expect(200); // Expect a 200 status code

        expect(res.body).toHaveProperty('content', 'Amazing product!');
        expect(res.body).toHaveProperty('rating', 5);
    });
});
