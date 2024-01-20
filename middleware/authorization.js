const jwt= require("jsonwebtoken");

// Bearer Token Verification----****
const _auth = {}
_auth.verifyToken = async (req, res, next) =>{
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(201).json({ message: "token was not provided" });
    }
    const decode = jwt.verify(token, "secret_key");
    console.log(decode)
    req.id = decode.id
    if (!decode) {
      return res.status(201).json({ message: "token expired" });
    }
    next();
  }

  module.exports = _auth;