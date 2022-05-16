const req = require('express/lib/request')

const Pool = require('pg').Pool
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  username: 'charlesclark',
  database: 'ecommerce',
})


//User commands:

//displays all users
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
     response.status(200).json(results.rows)
  })
}
//displays single user
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).json(results.rows)
  })
}
//creates new user

// const createUser = (request, response) => {
//   const { username, password, first_name, last_name, email } = request.body
//   console.log(request.body)
//   pool.query('INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5)',
//   [username, password, first_name, last_name, email ], (error, results) => {
//     if (error) {
//       throw error
//     }
//       response.status(201).send('user created' + first_name + '  ' + last_name)
//   })
// }

//updates existing user
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, password, first_name, last_name, email } = request.body
  pool.query( 'UPDATE users SET modified_at = NOW(), username = $1, password = $2, first_name = $3, last_name = $4, email = $5 WHERE id = $6',
  [username, password, first_name, last_name, email, id],
  (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).send(`User modified with ID: ${id}`)
  })
}
//deletes user
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).send(`User deleted with ID: ${id}`)
  })
}

//Product commands:

//displays all products
const getProducts = (request, response) => {
  pool.query('SELECT * FROM product ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
     response.status(200).json(results.rows)
  })
}

//displays products by type with discount

const getProductByCategory = (request, response) => {
  const category_id = parseInt(request.params.category_id)
  pool.query('SELECT product.id AS id, name, description, price, image, discount_percent, reason FROM product LEFT JOIN discount ON (product.discount_id = discount.id) WHERE category_id = $1 ORDER BY product.id ASC', 
  [category_id], (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).json(results.rows)
  })
}

//displays single product with discount and inventory

const getProductById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT product.id AS id, name, description, image, price, quantity, discount_percent, reason FROM product LEFT JOIN discount ON (product.discount_id = discount.id) LEFT JOIN product_inventory ON (product.inventory_id = product_inventory.id) WHERE product.id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).json(results.rows)
  })
}
//creates new product
const createProduct = (request, response) => {
  const { name, description, sku, price } = request.body
  pool.query('INSERT INTO product (name, description, sku, price) VALUES ($1, $2, $3, $4)',
  [name, description, sku, price], (error, results) => {
    if (error) {
      throw error
    }
      response.status(201).send(`Product added with ID: ${results.id}`)
  })
}
//updates existing product
const updateProduct = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, description, sku, price } = request.body
  pool.query( 'UPDATE product SET name = $1, description = $2, sku = $3, price = $4 WHERE id = $5',
  [name, description, sku, price, id],
  (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).send(`Product modified with ID: ${id}`)
  })
}
//deletes product
const deleteProduct = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM product WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).send(`Product deleted with ID: ${id}`)
  })
}

// Shopping session

const createShopSession = (request, response) => {
  const { user_id } = request.body
  pool.query('INSERT INTO shopping_session (user_id) VALUES ($1)',
  [user_id], (error, results) => {
    if (error) {
      throw error
    }
      response.status(201).send(`Shopping session started with ID: ${results.id}`)
  })
}
const updateShopSession = (request, response) => {
  const id = parseInt(request.params.id)
  const { user_id, total } = request.body
  pool.query( 'UPDATE shopping_session SET modified_at = NOW(), user_id = $1, total = $2 WHERE id = $3',
  [user_id, total, id],
  (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).send(`Shopping session modified with ID: ${id}`)
  })
}

// Cart Items
const addCartItem = (request, response) => {
  const { session_id, product_id, quantity } = request.body
  pool.query('INSERT INTO cart_items (session_id, product_id, quantity) VALUES ($1, $2, $3)',
  [session_id, product_id, quantity], (error, results) => {
    if (error) {
      throw error
    }
      response.status(201).send(`Cart item added with ID: ${results.id}`)
  })
}
const updateCartItem = (request, response) => {
  const id = parseInt(request.params.id)
  const { session_id, product_id, quantity } = request.body
  pool.query( 'UPDATE cart_items SET modified_at = NOW(), session_id = $1, product_id = $2, quantity = $3 WHERE id = $4',
  [session_id, product_id, quantity, id],
  (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).send(`Cart item modified with ID: ${id}`)
  })
}



module.exports = {
  pool,
  getUsers,
  getUserById,
  //createUser,
  updateUser,
  deleteUser,
  getProducts,
  getProductByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createShopSession,
  updateShopSession,
  addCartItem,
  updateCartItem
}