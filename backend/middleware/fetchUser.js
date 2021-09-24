const jwt = require('jsonwebtoken');

const fetchUser = async (req, res, next) => {
    // get the user from jwt token
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "access denied" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_TOKEN)
        req.user = data.user;
        next()
    } catch (error) {
        return res.status(401).json({ error: "access denied" })
    }

}
module.exports = fetchUser