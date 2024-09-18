const express = require("express");
const bodyParser = require("body-parser");
const service = require("./routes/service");
const connection = require('./config/coneection')

const app = express();

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use("/service", service);

const http = require("http").createServer(app);

http.listen("3303", () => {
  console.log("Server Connected 3303");
});

// let snum = 1;
// let endnum = 100;
// let a = 1;
// let fun = async function () {
//   console.log(a);
//   if (a <= 100) {
//     a++;
//     fun();
//   }
// };
// fun();
