const router = require('express').Router();
const { pool: pool } = require('./queries');
const authorization = require('../middleware/authorization')


router.post('/', authorization, async (req, res) => {
    try {
        const user = await pool.query('SELECT first_name FROM users WHERE id = $1', [req.user.id])
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

module.exports = router;