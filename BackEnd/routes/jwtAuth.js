const router = require('express').Router();
const {pool: pool} = require("../queries");
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//register route

router.post("/register", validInfo, async (req, res) => {
    try {
        const { username, password, first_name, last_name, email } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists")
        }
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)

        const bcryptPassword = await bcrypt.hash(password, salt)

        const newUser = await pool.query("INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [username, bcryptPassword, first_name, last_name, email]);

        const token = jwtGenerator(newUser.rows[0].id);

        res.json({ token })

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

//login route

router.post("/login", validInfo, async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE username = $1", [username])

        if (user.rows.length === 0) {
            return res.status(401).send("Username or Password is incorrect")

        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).json("Username or Password is incorrect")
        }

        const token = jwtGenerator(user.rows[0].username);

        res.json({ token })

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

router.get("/is-verify", authorization, async (req, res) => {
    try {

        res.json(true);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;