const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true,
  })
)

app.get('/', (req, res) => {
   res.json({ message: 'Welcome to my Ecommerce app' })
 })

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.get('/products', db.getProducts)
app.get('/products/:id', db.getProductById)
app.post('/products', db.createProduct)
app.put('/products/:id', db.updateProduct)
app.delete('/products/:id', db.deleteProduct)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})