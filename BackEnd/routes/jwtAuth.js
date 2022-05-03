const router = require('express').Router();
const {pool: pool} = require("./queries");
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//register route

router.post("/register", validInfo, async (req, res) => {
    const { username, password, first_name, last_name, email } = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if (user.rows.length > 0) {
            return res.status(401).send({msg: "User already exists"})
        }
        const salt = await bcrypt.genSalt(10);

        const bcryptPassword = await bcrypt.hash(password, salt)

        let newUser = await pool.query("INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [username, bcryptPassword, first_name, last_name, email]);

        const jwtToken = jwtGenerator(newUser.rows[0].user_id);

        res.json({ jwtToken })

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

//login route

router.post("/login", validInfo, async (req, res) => {
    const { username, password } = req.body;
    try {

        const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (user.rows.length === 0) {
            return res.status(401).send("Username or Password is incorrect")

        };

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).json({msg: "Username or Password is incorrect"})
        }
        
        const jwtToken = jwtGenerator(user.rows[0].id);

        res.json({ jwtToken })

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

router.post("/verify", authorization, async (req, res) => {
    try {
        
        res.json(true);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;