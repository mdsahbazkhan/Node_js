const http = require("http");
const fs = require("fs");
const url = require("url");
const myServer = http.createServer((req, res) => {
  //   console.log(req);
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}:${req.url} New Request Received\n`;
  const Myurl = url.parse(req.url, true);
  console.log(Myurl);

  fs.appendFile("./log.txt", log, (err, data) => {
    switch (Myurl.pathname) {
      case "/":
        res.end("My Home Page");
        break;
      case "/about":
        const userName = Myurl.query.my;
        res.end(`Hello, ${userName}`);
        break;
      case "/search":
        const search = Myurl.query.search_query;
        res.end("Here is your result for " + search);
        break;
      default:
        res.end("404 Not Found");
    }
  });
});
const port = 8001;
myServer.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
