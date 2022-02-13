import express from "express";
import data from "../data/limadmin.json";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log("hello est-ce que tu vois ");

  res.send({ data });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
