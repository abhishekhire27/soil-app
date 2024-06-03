// const { where } = require("sequelize");
const db = require("../config").default;

exports.emptyCart = async (req, res) => {
    const { cartId } = req.body;
    
    if (!cartId) {
        return res.status(400).json({ error: "cartId is required" });
    }

    try {
        await db.cartItems.destroy({
            where: {
                cartId: cartId
            }
        });
        res.status(200).json({ message: "Cart emptied successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting items in the cart", details: error.message });
    }
};

exports.getCartItems = async (req, res) => {
    const { cartId } = req.query;

    if (!cartId) {
        return res.status(400).json({ error: "cartId is required" });
    }

    try {

        const cartItems = await db.cartItems.findAll({
            where: {
                cartId: cartId
            },
            include: {all: true, nested: true}
        });

        const itemPromise = cartItems.map(async(cartItem) => {
            cartItem.item = await db.item.findOne({where: {itemId: cartItem.itemId}});
            return {
                itemId: cartItem.item.itemId,
                name: cartItem.item.name,
                image: cartItem.item.image,
                price: cartItem.item.price,
                description: cartItem.item.description,
                specialDays: cartItem.item.specialDays,
                specialPrice: cartItem.item.specialPrice,
                quantity: cartItem.quantity
            };
        });

        const items = await Promise.all(itemPromise);
        res.status(200).json(items);

    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve cart items", details: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    const { cartId, itemId } = req.body;

    if (!cartId || !itemId) {
        return res.status(400).json({ error: "cartId and itemId are required" });
    }

    try {
        await db.cartItems.destroy({
            where: {
                cartId: cartId,
                itemId: itemId
            }
        });

        const cartItems = await db.cartItems.findAll({
            where: {
                cartId: cartId
            },
            include: {all: true, nested: true}
        });

        const itemPromise = cartItems.map(async(cartItem) => {
            cartItem.item = await db.item.findOne({where: {itemId: cartItem.itemId}});
            return {
                itemId: cartItem.item.itemId,
                name: cartItem.item.name,
                image: cartItem.item.image,
                price: cartItem.item.price,
                description: cartItem.item.description,
                specialDays: cartItem.item.specialDays,
                specialPrice: cartItem.item.specialPrice,
                quantity: cartItem.quantity
            };
        });

        const items = await Promise.all(itemPromise);
        res.status(200).json(items);

    } catch (error) {
        res.status(500).json({ error: "Error deleting item from the cart", details: error.message });
    }
};

exports.addToCart = async(req, res) => {
    const items = req.body;
    
    try {
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: "No items provided or invalid format" });
        }

        for (const item of items) {
            const existingItem = await db.cartItems.findOne({
                where: {
                    cartId: item.cartId,
                    itemId: item.itemId
                }
            });

            if (existingItem) {
                existingItem.quantity += item.quantity;
                await existingItem.save();
            } else {
                await db.cartItems.create({
                    cartId: item.cartId,
                    itemId: item.itemId,
                    quantity: item.quantity
                });
            }
        }
        res.status(200).json({ message: "Items added successfully" });

    } catch (error) {
        res.status(500).json({ error: "Failed to add items to cart" });
    }
};
