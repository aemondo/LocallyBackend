import express from "express";
import fs from "fs";

const app = express();
const port = 3000;
let rawData = JSON.parse(fs.readFileSync("./data/limadmin.json", "utf-8"));

app.get("/", (req, res) => {
  console.log(rawData);
  res.send({ rawData });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
