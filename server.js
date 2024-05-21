const { createServer } = require("node:http");
const { readFileSync, writeFileSync } = require("fs");
const url = require("url");

const server = createServer((req, res) => {
  const form = readFileSync("./index.html", "utf8");
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end(form);
  } else if (req.method === "GET") {
    let data = url.parse(req.url, true);
    let readData = readFileSync("./database.json", "utf8");

    if (readData) {
      let parsedData = JSON.parse(readData);
      let database = [...parsedData, data.query];

      let stringData = JSON.stringify(database);

      writeFileSync("./database.json", stringData);

      res.writeHead(201, {
        "Content-Type": "text/plain",
        // location: "/database",
        "content-location": "/database",
      });

      let databaseRes = readFileSync("./database.json", "utf8");
      // console.log(databaseRes);
      res.end(databaseRes);
    } else {
      let database = [data.query];
      let stringData = JSON.stringify(database);
      writeFileSync("./database.json", stringData);

      res.writeHead(201, {
        "Content-Type": "text/plain",
        // location: "/database",
        "content-location": "/database",
      });

      let databaseRes = readFileSync("./database.json", "utf8");
      // console.log(databaseRes);
      res.end(databaseRes);
    }
  } else {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });

    res.end("Not Found");
  }
});

const port = 8080;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
