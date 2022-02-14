import express from "express";
import fs from "fs";
import * as turf from "@turf/turf";
import { MultiPolygon, Polygon } from "@turf/turf";

interface GeoPoint {
  lat: number;
  lng: number;
}

interface Region {
  name: string;
  shape: number[][][];
}

const app = express();
const port = 3000;
let rawData = JSON.parse(fs.readFileSync("./data/limadmin.json", "utf-8"));

const regions: Region[] = rawData.features.map((feature) => ({
  name: feature.properties.NOM,
  shape: feature.geometry.coordinates[0],
}));

app.get("/", (req, res) => {
  console.table(regions);

  const myLocation = turf.point([-73.634444, 45.432114]);

  const foundRegion = regions.find((region) =>
    turf.booleanPointInPolygon(myLocation, turf.polygon(region.shape))
  );

  res.send({ foundRegion });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
