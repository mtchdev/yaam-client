import React from "react";
import { Polygon } from "react-leaflet";

export const FIRPolygons = (data, atc) => {
  const polys = [];
  if (data != null) {
    data.forEach((sector, index) => {
      const { coordinates: coordsList } = sector.geometry;
      const { FIRname: name, ICAOCODE: code } = sector.properties;

      if (ignored.includes(code)) {
        return;
      }

      /* For some fucking reason, ICAO data comes like this: long, lat.
            Leaflet (and pretty much any sane person) accepts coords as 'lat, long'... */
      let list = coordsList[0];
      list.forEach(element => {
        element = element.reverse();
      });

      let fill = false;
      let weight = 0.5;
      atc.forEach(station => {
        if (station.callsign.substr(0, 4) === code) {
          fill = true;
          weight = 2;
        }
      });

      polys.push(
        <Polygon
          weight={weight}
          dashArray="5"
          positions={coordsList}
          name={name}
          fill={fill}
          code={code}
          color="gray"
        />
      );
    });
    return polys;
  }
};

const ignored = ["ULMM", "CZQX"];
