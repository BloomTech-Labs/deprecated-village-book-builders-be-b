const port = process.env.PORT || 5000;
const fs = require("fs");
const cors = require("cors");

const {
  createToken,
  verifyToken,
  isAuthenticated,
} = require("./controllers.js");

const bodyParser = require("body-parser");
const jsonServer = require("json-server-relationship");

const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

// Register New User
server.post("/auth/register", (req, res) => {
  // console.log("register endpoint called; request body:");
  // console.log(req.body);
  const { email, password } = req.body;

  if (isAuthenticated({ email, password }) === true) {
    const status = 401;
    const message = "Email and Password already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./db.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    // Get current user data
    var data = JSON.parse(data.user.toString());

    // Get the id of last user
    var last_item_id = data.user[data.user.length - 1].id;

    //Add new user
    data.user.push({ id: last_item_id + 1, email: email, password: password }); //add some data
    var writeData = fs.writeFile(
      "./user.json",
      JSON.stringify(data),
      (err, result) => {
        // WRITE
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });

  // Create token for new user
  const access_token = createToken({ email, password });
  // console.log("Access Token:" + access_token);
  res.status(200).json({ access_token });
});

// Login to one of the user from ./user.json
server.post("/auth/login", (req, res) => {
  // console.log("login endpoint called; request body:");
  // console.log(req.body);
  const { email, password } = req.body;
  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = "Incorrect email or password";
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ email, password });
  // console.log("Access Token:" + access_token);
  res.status(200).json({ access_token });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  // console.log(req.headers.authorization)
  if (req.headers.authorization === undefined) {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message, headers: req.headers });
    return;
  }
  try {
    let verifyTokenResult;
    // console.log(req.headers.authorization);
    verifyTokenResult = verifyToken(req.headers.authorization);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = "Access token not provided";
      res
        .status(status)
        .json({ status, message, token: req.headers.authorization });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = "Error access_token is revoked";
    res.status(status).json({ status, message });
  }
});

server.use(router);
server.use(cors());

server.listen(port, () =>
  console.log(`\n** Running on port ${port} **\t http://localhost:${port}/\n`)
);
