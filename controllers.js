const fs = require("fs");
const jwt = require("jsonwebtoken");
const userdb = JSON.parse(fs.readFileSync("./db.json", "UTF-8"));

const SECRET_KEY = "123456789";
const expiresIn = "24h";

// Retrieve User Id and role to send in JWT
const getUserData = ({ email, password }) => {
  const { id, role } = userdb.user[
    userdb.user.findIndex(
      (user) => user.email === email && user.password === password
    )
  ];
  return { id, role };
};

// Create a token from a payload
const createToken = (payload) => {
  payload = getUserData(payload);
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// Verify the token
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
};

// Check if the user exists in database
const isAuthenticated = ({ email, password }) => {
  return (
    userdb.user.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
};

module.exports = { isAuthenticated, verifyToken, createToken };
