const router = require('express').Router();
const {pool: pool} = require("../queries");
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator')

//register route

router.post("/register", async (req, res) => {
    try {
        const { username, password, first_name, last_name, email } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists")
        }
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)

        const bcryptPassword = bcrypt.hash(password, salt)

        const newUser = await pool.query("INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [username, bcryptPassword, first_name, last_name, email]);

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token })

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});




module.exports = router;