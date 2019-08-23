import React, { Component } from "react";
import { getDistance } from 'geolib';
import { FaArrowCircleRight } from "react-icons/fa";
import {
  Card,
  CardBody,
  Progress,
  Badge
} from "shards-react";

export default class FlightHistory extends Component {
  render() {
    const {
      callsign,
      airline,
      aircraft,
      dep,
      arr,
      trail,
      name
    } = this.props.data;

    const { alt, spd, hd, lat, lng } = trail[0];
    const position = {lat, lng};
    
    const progress = calculateProgress(
        {latitude: dep.lat, longitude: dep.long},
        {latitude: arr.lat, longitude: arr.long},
        {latitude: position.lat, longitude: position.lng}
        );


    return (
      <Card className={"sidebar-flightdetails"}>
        <CardBody>
          <div className="mainDetailsFlex">
            <div>
              <h2>{dep.code.icao}</h2>
              <p>{dep.region.city}</p>
            </div>

            <div>
              <h5><FaArrowCircleRight /></h5>
            </div>

            <div>
              <h2>{arr.code.icao}</h2>
              <p>{arr.region.city}</p>
            </div>
          </div>
          <Progress value={progress} />
          <hr />
          <div className={"subdetailsFlex"}>
            <div className="logoAndCallsignWrapper">
              <div>
                <img
                  style={{ width: "auto", maxHeight: "3em" }}
                  src={
                    `https://planefinder.net/flightstat/v2/getLogo3x.php?airlineCode=${callsign.substr(0, 3)}&requestThumb=1`
                  }
                  alt={""}
                />
              </div>
              <h3>{callsign}</h3>
            </div>
            <div>
              <p style={{ fontSize: 14 }}>AIRCRAFT TYPE</p>
              {/* <p style={{color: 'gray'}}>{aircraft}</p> */}
              <Badge theme="primary">{aircraft}</Badge>
            </div>
          </div>
          <div className={"subdetailsFlex"}>
            <div>
              <p style={{ fontSize: 14 }}>ALTITUDE</p>
              <p style={{ color: "gray" }}>{alt}</p>
            </div>
            <div>
              <p style={{ fontSize: 14 }}>SPEED</p>
              <p style={{ color: "gray" }}>{spd}</p>
            </div>
            <div>
              <p style={{ fontSize: 14 }}>HEADING</p>
              <p style={{ color: "gray" }}>{hd}°</p>
            </div>
          </div>
          <div className={"subdetailsFlex"}>
            <div>
              <p style={{ fontSize: 14 }}>PILOT</p>
              <p style={{color: 'gray'}}>{name}</p>
            </div>
            <div>
              <p style={{ fontSize: 14 }}>FIELD 5</p>
              <p style={{ color: "gray" }}>Value</p>
            </div>
            <div>
              <p style={{ fontSize: 14 }}>FIELD 6</p>
              <p style={{ color: "gray" }}>Value</p>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}

const calculateProgress = (depCoords, arrCoords, position) => {
    if (depCoords.latitude === null || depCoords.longitude === null){ return 0}
    const dist = getDistance(depCoords, arrCoords);
    const distLeft = getDistance(arrCoords, position);
    return Math.floor((dist-distLeft)/dist*100);
}
