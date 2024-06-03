const db = require('../config').default;
const argon2 = require('argon2');

async function seed() {
    const hashedPassword = await argon2.hash('password', { type: argon2.argon2id });

    const cart1 = await db.cart.create();
    const cart2 = await db.cart.create();

    const user1 = await db.user.create(
        {
            name : "A",
            emailId: 'testuser1@example.com',
            password_hashed: hashedPassword,
            joiningDate: new Date(),
            cartId: cart1.cartId,
            userStatus: 'ACTIVE',
        }
    )
    const user2 = await db.user.create(
        {
            name : "A",
            emailId: 'testuser1@example.com',
            password_hashed: hashedPassword,
            joiningDate: new Date(),
            cartId: cart2.cartId,
            userStatus: 'ACTIVE',
        }
    )

    const cartItems = [
        { cartId: cart1.cartId, itemId: 3, quantity: 2, userId: user1.userId},
        { cartId: cart1.cartId, itemId: 4, quantity: 1, userId: user1.userId }
    ]

    // await db.cart.bulkCreate(carts);
    // await db.user.bulkCreate(users);
    await db.cartItems.bulkCreate(cartItems);
}

module.exports = { seed };