const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../configuration/jwtConfig");

function authenticateToken(req, res, next) {
  const authHeader = req.header("authorization");
  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized: No token provided" });
  }
  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(403).send({ message: "Forbidden: Wrong authentication scheme" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if(err) {
      return res.status(403).send({message : err.message});
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };