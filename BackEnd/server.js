const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const port = 5000;
const pool = require('./routes/queries');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,})
);

//register and login routes

app.use("/auth", require("./routes/jwtAuth"));

//dashboard route

app.use("/dashboard", require("./routes/dashboard"));

app.get('/users', pool.getUsers);
app.get('/users/:id', pool.getUserById);
//app.post('/users', pool.createUser);
app.put('/users/:id', pool.updateUser);
app.delete('/users/:id', pool.deleteUser);

app.get('/products', pool.getProducts);
app.get('/products/category/:category_id', pool.getProductByCategory);
app.get('/products/:id', pool.getProductById);
app.post('/products', pool.createProduct);
app.put('/products/:id', pool.updateProduct);
app.delete('/products/:id', pool.deleteProduct);

app.post('/session', pool.createShopSession);
app.put('/session/:id', pool.updateShopSession);

app.post('/cart', pool.addCartItem);
app.put('/cart/:id', pool.updateCartItem)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})