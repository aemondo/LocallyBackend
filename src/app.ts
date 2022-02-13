import express from "express";
import fs from "fs";

const app = express();
const port = 3000;
let data = fs.readFileSync("./data/limadmin.json");

app.get("/", (req, res) => {
  console.log("hello est-ce que tu vois ");

  res.send({ data });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
