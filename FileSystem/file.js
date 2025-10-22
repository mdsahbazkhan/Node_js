const fs = require("fs");
const os = require("os");
console.log(os.cpus().length);

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

// fs.appendFileSync("./test.txt", `Hello Again \n`);
// fs.copyFileSync("./test.txt", "./copy.txt");
// fs.unlinkSync("./copy.txt");
// fs.mkdirSync("my-Docs");

// Node Js works/Event handling

// Blocking operation
// console.log("1");

// let result = fs.readFileSync("./test.txt", "utf-8");
// console.log(result);
// console.log(2);
// console.log(3);
// console.log(4);
// console.log(5);

//Non-Blocking Operation
// console.log("1");

fs.readFile("read.txt", "utf-8", (err, result) => {
  //   console.log(result);
});
// console.log(2);
// console.log(3);
// console.log(4);
// console.log(5);

// thread pool size by default 4
// max thread cpus console.log(os.cpus().length);
