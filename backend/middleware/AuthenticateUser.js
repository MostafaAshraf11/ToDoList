const jwt = require("jsonwebtoken");

function authenticateUser(req, res, next) {
  var token = req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied");

  try {
    token = token.trim();
    token =token.split(" ")[1];
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log("verified");
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid Token");
  }
}

module.exports = { authenticateUser };
