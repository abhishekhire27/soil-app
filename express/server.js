const express = require('express');
const cors = require('cors');
const db = require('./src/config/mysqlConfig');

db.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

const app = express();

app.use(express.json());
app.use(cors());

require("./src/routes/cartItems.routes.js")(express,app);
require("./src/routes/item.routes.js")(express,app);
require("./src/routes/user.routes.js")(express,app);
require("./src/routes/review.routes.js")(express,app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})