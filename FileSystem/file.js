const fs = require("fs");
//sync
// fs.writeFileSync("./test.txt", "Learning File system");

// async
// fs.writeFile("./test1.txt", "Learning File system async", (err) => {});

//sync
// let result = fs.readFileSync("./read.txt", "utf-8");
// console.log(result);

//async
// fs.readFile("./read.txt", "utf-8", (err, result) => {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log(result);
//   }
// });

fs.appendFileSync("./test.txt", `Hello Again \n`);
// fs.copyFileSync("./test.txt", "./copy.txt");
// fs.unlinkSync("./copy.txt");
fs.mkdirSync("my-Docs");
