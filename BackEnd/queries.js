const { append } = require('express/lib/response')
const { user } = require('pg/lib/defaults')

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

//Song commands:

//displays all products
const getSingles = (request, response) => {
  pool.query('SELECT * FROM singles ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
     response.status(200).json(results.rows)
  })
}
//displays one song
const getSingleById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM singles WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).json(results.rows)
  })
}
//creates new song
const createSingle = (request, response) => {
  const { name, description, sku, price } = request.body
  pool.query('INSERT INTO singles (name, description, sku, price) VALUES ($1, $2, $3, $4)',
  [name, description, sku, price], (error, results) => {
    if (error) {
      throw error
    }
      response.status(201).send(`Song added with ID: ${results.id}`)
  })
}
//updates existing product
const updateSingle = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, description, sku, price } = request.body
  pool.query( 'UPDATE singles SET modified_at = NOW(), name = $1, description = $2, sku = $3, price = $4 WHERE id = $5',
  [name, description, sku, price, id],
  (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).send(`Song modified with ID: ${id}`)
  })
}
//deletes product
const deleteSingle = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM singles WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).send(`Song deleted with ID: ${id}`)
  })
}

module.exports = {
  pool,
  getUsers,
  getUserById,
  //createUser,
  updateUser,
  deleteUser,
  getSingles,
  getSingleById,
  createSingle,
  updateSingle,
  deleteSingle
}