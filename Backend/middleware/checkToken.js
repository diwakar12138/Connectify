const jwt = require('jsonwebtoken');
const jwt_secret = 'your_secret_key_here';

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        // console.log(token)

 

        if (!token) {
            return res.status(401).json({ msg: "Invalid token format" });
        }

        const verify = jwt.verify(token, jwt_secret);
        console.log(verify)

        req.user = verify.id;   // ya verify.id depending on what you stored
        next();

    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
};

module.exports = verifyToken;