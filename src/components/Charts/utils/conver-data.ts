import { coordinateData } from "../data/coordinate-data";

export function convertData(data: any) {
  const res = [];
  for (let i = 0; i < data.length; i++) {
    const GeoCoord = coordinateData[data[i].name];
    if (GeoCoord) {
      res.push({ name: data[i].name, value: GeoCoord.concat(data[i].value) });
    }
  }
  return res;
}
