import React, { Component } from "react";
import FIRPoly from './FIRPoly';

const ignored = ["ULMM", "CZQX"];

export default class FIRPolys extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  render() {
    const { atc, show } = this.props;
    const { data } = this.state;
    const FIRs = this.matchControllersToPolygons(data, atc);
    if (FIRs == null || show === false) return null;
    return FIRs;
  }

  componentDidMount = () => {
    this.fetchFIRData();
  };

  // Match to correct polygon. Builds the polygon list.
  matchControllersToPolygons = (data, atc) => {
    // Simulate online stations for tests here:
    
    const polys = [];
    if (data != null) {
      data.forEach((sector, index) => {
        let { coordinates: coordsList } = sector.geometry;
        const { FIRname: name, ICAOCODE: code } = sector.properties;          

        if (ignored.includes(code)) {
          return;
        }

        if (coordsList.length > 1) {
          console.log(coordsList);
          
          if (coordsList[0].length === 1) {
            coordsList = coordsList[0]
            console.log(coordsList);
            
          }
        }


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
          <FIRPoly
            key={index}
            onClick={() => console.log(`${code}: ${name}`)}
            weight={weight}
            dashArray="5"
            positions={coordsList}
            name={name}
            fill={fill}
            code={code}
            fillOpacity={0.25}
            color="gray"
          />
        );
      });
      return polys;
    }
  };

  // For specific cases, an FIR might have a different name on the network than it does in the ICAO DB.
  nameOnNetwork = FIR => {
    const list = [
      { netName: "LON", FIR: "EGTT" },
      { netName: "OAK", FIR: "KZOA" },
      { netName: "TOR", FIR: "CZYZ" },
      { netName: "JAX", FIR: "KZJX" },
      { netName: "HOU", FIR: "KZHU" },
      { netName: "NY", FIR: "KZNY" },
      { netName: "CLE", FIR: "KZOB" },
    ];

    for (const e of list) {
      if (e.FIR === FIR) return e.netName;
    }

    return FIR;
  };

  // This data isn't expected to change, ever, so it would be overkill to keep it in our redux store.
  fetchFIRData = async () => {
    try {
      let data = await fetch(
        "https://v4p4sz5ijk.execute-api.us-east-1.amazonaws.com/anbdata/airspaces/zones/fir-list?api_key=04775150-c03c-11e9-ba38-ab1794fa7a73&format=json"
      );
      data = await data.json();

      data.forEach((sector) => {
        const { coordinates: coordsList } = sector.geometry;

        /* For some reason, ICAO data comes like this: long, lat.
              Leaflet (and pretty much any sane person) accepts coords as 'lat, long'... */

        if (coordsList.length > 1) {
          if (coordsList[0].length === 1) {
            coordsList.forEach(lvl1 => {
              let lvl2 = lvl1[0];
              lvl2.forEach(lvl3 => {
                lvl3 = lvl3.reverse();
              });
            });
          }
        }

        let list = coordsList[0];
        list.forEach(element => {
          element = element.reverse();
        });
      });

      this.setState({ data });
    } catch (error) {
      console.log(error);
      this.setState({ data: null})
    }

  };
}
