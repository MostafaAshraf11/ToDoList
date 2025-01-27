const jwt = require("jsonwebtoken");

function authenticateUser(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid Token");
  }
}

module.exports = { authenticateUser };
