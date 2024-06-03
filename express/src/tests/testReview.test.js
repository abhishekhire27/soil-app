// Import necessary modules
const request = require('supertest'); // Import supertest for making HTTP requests
const app = require('../../server'); // Adjust the path to point to your server file
const db = require('../config').default; // Import your database configuration

// Mock the database configuration
jest.mock('../config', async() => {
    const SequelizeMock = require('sequelize-mock'); // Import SequelizeMock for mocking Sequelize
    const dbMock = new SequelizeMock(); // Create a new instance of SequelizeMock

    // Define a mock model for the 'review' table
    return {
        default: {
            review: dbMock.define('review', {
                reviewId: '1',
                content: 'Great product!',
                rating: 5
            })
        }
    };
});

// Create a test user in the mock database
const user1 = await db.user.create({
    name: "A",
    emailId: 'testuser1@example.com',
    password_hashed: hashedPassword, // Make sure to define `hashedPassword` or adjust as needed
    joiningDate: new Date(),
    cartId: cart1.cartId, // Make sure to define `cart1` or adjust as needed
    userStatus: 'ACTIVE',
});

// Define an object to store new review data
let newReviewData = {};

// Test the /saveReview endpoint
describe('POST /saveReview', () => {
    // Test case for creating a new review successfully
    it('should create a new review successfully', async () => {
        // Define the new review data
        newReviewData = {
            content: 'Amazing product!',
            rating: 5,
            itemId: 1,
            userId: user1.userId // Use the userId of the test user
        };

        // Make a POST request to the /saveReview endpoint with the new review data
        const res = await request(app)
            .post('/saveReview')
            .send(newReviewData)
            .expect(200); // Expect a 200 status code

        // Assert that the response contains the expected review content and rating
        expect(res.body).toHaveProperty('content', 'Amazing product!');
        expect(res.body).toHaveProperty('rating', 5);
    });
});
