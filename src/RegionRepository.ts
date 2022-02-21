import fs from "fs";
import { point, polygon } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";

export interface Region {
  name: string;
  shape: number[][][];
}

export interface Point {
  lat: number;
  lng: number;
}

const mtlRawGeoJson = JSON.parse(
  fs.readFileSync("./data/limadmin.json", "utf-8")
);

const reverseCoordinates = (coordinates: number[][]) => {
  return [coordinates[0].map((positions) => [positions[1], positions[0]])];
};

export default class RegionRepository {
  private regions: Region[];

  constructor() {
    this.regions = mtlRawGeoJson.features.map((feature) => ({
      name: feature.properties.NOM,
      shape: reverseCoordinates(feature.geometry.coordinates[0]),
    }));
  }

  public findRegionAt({ lat, lng }: Point): Region | undefined {
    const myLocation = point([Number(lat), Number(lng)]);

    const foundRegion = this.regions.find((region) =>
      booleanPointInPolygon(myLocation, polygon(region.shape))
    );

    return foundRegion;
  }
}
