const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const parseToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

            console.log("decode");
            console.log(decoded);

            if (decoded == null) {
                res.status(401).json({
                    code: 401,
                    message: "Unautorized access",
                    data: null
                });
            } else {
                console.log("success");
                req.user = decoded;
                console.log(decoded);
                next();
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                code: 500,
                status: "server error",
                data: null
            })
        }
    } else {
        res.status(401).json({
            code: 401,
            status: "token not found",
            data: null
        })
    }
}

module.exports={parseToken};