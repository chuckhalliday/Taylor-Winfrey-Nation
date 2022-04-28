const jwt = require("jsonwebtoken");
require('dotenv').config();


module.exports = function (req, res, next) {
const token = req.header("jwt_token")

    if (!token) {
        return res.status(403).json({ msg: "Authorization Denied"});
    }
    try {

        const payload = jwt.verify(token, process.env.jwtSecret);

        req.user = payload.user;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ msg: "Token is not valid" })
    }
}