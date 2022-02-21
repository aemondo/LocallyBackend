import express from "express";
import RegionRepository from "./RegionRepository.js";

const app = express();
const port = 3000;

const regionRepository = new RegionRepository();

app.get("/currentRegion", (req, res) => {
  const { lat, lng } = req.query;
  const position = { lat: Number(lat), lng: Number(lng) };

  const foundRegion = regionRepository.findRegionAt(position);

  if (!foundRegion) {
    res.status(404).send("Not within montreal");
  } else {
    console.log("error");
    res.send({ foundRegion });
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
