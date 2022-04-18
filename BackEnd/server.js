const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const cors = require('cors')
const pool = require('./queries')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true,
  })
)


app.get('/login',
  (req, res) => {
    res.sendFile(__dirname + '/login.html');
  });

app.post('/login/password',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/~' + req.user.username);
  });

app.get('/users', pool.getUsers)
app.get('/users/:id', pool.getUserById)
app.post('/users', pool.createUser)
app.put('/users/:id', pool.updateUser)
app.delete('/users/:id', pool.deleteUser)

app.get('/products', pool.getProducts)
app.get('/products/:id', pool.getProductById)
app.post('/products', pool.createProduct)
app.put('/products/:id', pool.updateProduct)
app.delete('/products/:id', pool.deleteProduct)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})