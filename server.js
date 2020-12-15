const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.post("/login", (req, res) => {
  const { username, password } = req.body;
  let data = jsonfile.readFileSync(file);
  res.status(200).json({ message: "Welcome to our API", data: data.users });
});
server.listen(3000, () => {
  console.log("JSON Server is running");
});
