const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const mysql = require("mysql");
const cors = require("cors");
const db = require("./config");

const app = express();
app.use(cors());

const schema = buildSchema(`
  type User {
    userId: Int,
    name: String,
    emailId: String,
    joiningDate: String,
    userStatus: String
  },
  type Item {
    itemId: Int
    name: String
    image: String
    price: Float
    description: String
    specialDays: String
    specialPrice: Float
  },
  type Review {
    reviewId: Int
    reviewText: String
    starRating: Int
    user: User
    item: Item
  },


  type Query {
    getUsers: [User],
    getItems: [Item],
    getReviews: [Review]
  },
  type Mutation {
    blockUser(userId: Int) : Boolean
    unBlockUser(userId: Int) : Boolean
    createItem(name: String, image: String, price: Float, description: String, specialDays: String, specialPrice: Float): Item
    updateItem(itemId: Int, name: String, image: String, price: Float, description: String, specialDays: String, specialPrice: Float): Item
    deleteItem(itemId: Int): Boolean
    deleteReview(reviewId: Int): Boolean
  }
`);

const reviewResolver = {
  getReviews: async () => {
    try {
      const reviews = await db.review.findAll({
        include: [
          { model: db.user, as: "user" },
          { model: db.item, as: "item" },
        ],
      });
      return reviews;
    } catch (error) {
      throw new Error("Error fetching reviews");
    }
  },

  deleteReview: async (args, req) => {
    await db.review.update(
      { reviewText: "[**** This review has been deleted by the admin ***]" },
      { where: { reviewId: args.reviewId } }
    );
    return true;
  },
};

const itemResolver = {
  getItems: async () => {
    try {
      const items = await db.item.findAll();
      return items;
    } catch (error) {
      throw new Error("Error fetching items");
    }
  },
  createItem: async ({
    name,
    image,
    price,
    description,
    specialDays,
    specialPrice,
  }) => {
    try {
      const newItem = await db.item.create({
        name,
        image,
        price,
        description,
        specialDays,
        specialPrice,
      });
      return newItem;
    } catch (error) {
      throw new Error("Error creating item");
    }
  },
  updateItem: async ({
    itemId,
    name,
    image,
    price,
    description,
    specialDays,
    specialPrice,
  }) => {
    try {
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (image !== undefined) updateData.image = image;
      if (price !== undefined) updateData.price = price;
      if (description !== undefined) updateData.description = description;
      if (specialDays !== undefined) updateData.specialDays = specialDays;
      if (specialPrice !== undefined) updateData.specialPrice = specialPrice;

      await db.item.update(updateData, { where: { itemId } });

      const updatedItem = await db.item.findOne({ where: { itemId } });
      return updatedItem;
    } catch (error) {
      throw new Error("Error updating item");
    }
  },
  deleteItem: async ({ itemId }) => {
    try {
      await db.item.destroy({ where: { itemId } });
      return true;
    } catch (error) {
      return false;
    }
  },
};

const userResolver = {
  getItems: async (args, req) => {
    const users = await db.item.findAll();
    return users;
  },
  getUsers: async (args, req) => {
    const users = await db.user.findAll();
    return users;
  },
  blockUser: async (args, req) => {
    await db.user.update(
      { userStatus: "BLOCKED" },
      { where: { userId: args.userId } }
    );
    return true;
  },
  unBlockUser: async (args, req) => {
    await db.user.update(
      { userStatus: "ACTIVE" },
      { where: { userId: args.userId } }
    );
    return true;
  },
};

const root = {
  ...userResolver,
  ...itemResolver,
  ...reviewResolver,
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

db.sync().then(() => {
  app.listen(4000);
  console.log("Running a GraphQL API server at localhost:4000/graphql");
});
