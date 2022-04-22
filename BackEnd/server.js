const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const port = 5000;
const pool = require('./queries');

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
app.get('/products/:id', pool.getProductById);
app.post('/products', pool.createProduct);
app.put('/products/:id', pool.updateProduct);
app.delete('/products/:id', pool.deleteProduct);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})