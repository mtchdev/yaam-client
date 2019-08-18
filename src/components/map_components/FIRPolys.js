import React, { Component } from "react";
import { Polygon } from "react-leaflet";

const ignored = ["ULMM", "CZQX"];

export default class FIRPolys extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  render() {
    const { atc } = this.props;
    const { data } = this.state;
    const FIRs = this.matchControllersToPolygons(data, atc);

    if (FIRs == null) return null;
    return FIRs;
  }

  componentDidMount = () => {
    this.fetchFIRData();
  };

  // Match to correct polygon. Builds the polygon list.
  matchControllersToPolygons = (data, atc) => {
    // Simulate online stations for tests here:

    atc.push({ callsign: "LON_N_CTR" });
    atc.push({ callsign: "EDWW_CTR" });
    atc.push({ callsign: "EHAA_CTR" });
    atc.push({ callsign: "EBBU_CTR" });
    atc.push({ callsign: "EDGG_CTR" });
    atc.push({ callsign: "EDMM_CTR" });
    atc.push({ callsign: "LFFF_CTR" });
    atc.push({ callsign: "LFEE_CTR" });

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
        const netName = this.nameOnNetwork(code);

        atc.forEach(station => {
          const subLen = netName.length;

          if (station.callsign.substr(0, subLen) === netName) {
            fill = true;
            weight = 2;
          }
        });

        polys.push(
          <Polygon
            key={index}
            onClick={() => console.log(`${code}: ${name}`)}
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

  // For specific cases, an FIR might have a different name on the network than it does in the ICAO DB.
  nameOnNetwork = FIR => {
    const list = [{ netName: "LON", FIR: "EGTT" }];

    for (const e of list) {
      if (e.FIR === FIR) return e.netName;
    }

    return FIR;
  };

  // This data isn't expected to change, ever, so it would be overkill to keep it in our redux store.
  fetchFIRData = async () => {
    let data = await fetch(
      "https://v4p4sz5ijk.execute-api.us-east-1.amazonaws.com/anbdata/airspaces/zones/fir-list?api_key=04775150-c03c-11e9-ba38-ab1794fa7a73&format=json"
    );
    data = await data.json();
    this.setState({ data });
  };
}
