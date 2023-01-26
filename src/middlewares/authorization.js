const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

exports.parseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        code: 401,
        status: "Token not found",
        data: null
      })
    }
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    if (decoded == null) {
      return res.status(401).json({
        code: 401,
        message: "Unautorized access",
        data: null
      });
    } else {
      console.log("success");
      req.user = decoded;
      req.user.role = decoded['authorities'];
      console.log(decoded);
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      code: 403,
      status: "Token expired",
      data: null
    })
  }
}

exports.checkRole = function (roles = []) {
  return async (req, res, next) => {
    const userRoles = req.user.role;

    // the output will be the same element of 2 array
    const cek = roles.filter(element => userRoles.includes(element));

    if (cek.length == 0) {
      console.log("your roles: " + userRoles);
      console.log("need roles: " + roles);
      return res.status(403).json({
        code: 403,
        message: "Forbidden, role not authorized",
        data: null
      });
    } else {
      console.log("permision granted");
      next();
    }
  }
}
