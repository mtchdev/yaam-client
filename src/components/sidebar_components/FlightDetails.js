import React, { Component } from "react";
import { getDistance } from 'geolib';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Progress,
  Badge
} from "shards-react";

export default class FlightHistory extends Component {
  render() {
    const {
      callsign,
      airline,
      pilotName,
      aircraft,
      dep,
      arr,
      trail
    } = this.props.data;

    const { alt, spd, hd, lat, lng } = trail[0];
    const position = {lat, lng};
    
    const progress = calculateProgress(
        {latitude: dep.lat, longitude: dep.lng},
        {latitude: arr.lat, longitude: arr.lng},
        {latitude: position.lat, longitude: position.lng}
        );


    return (
      <Card className={"sidebar-flightdetails"}>
        <CardHeader>
          <h5 style={{ margin: 0 }}>{callsign}</h5>
        </CardHeader>
        <CardBody>
          <div className="mainDetailsFlex">
            <div>
              <h4>{dep.code.icao}</h4>
              <p>{dep.region.city}</p>
            </div>

            <div>
              <h5>to</h5>
            </div>

            <div>
              <h4>{arr.code.icao}</h4>
              <p>{arr.region.city}</p>
            </div>
          </div>
          <Progress value={progress} />
          <hr />
          <div className={"subdetailsFlex"}>
            <img
              style={{ maxWidth: "50%", height: "50%" }}
              src={
                "https://planefinder.net/flightstat/v2/getLogo3x.php?airlineCode=SAS&requestThumb=1"
              }
              alt={""}
            />
            <div>
              <p style={{ fontSize: 14 }}>Aircraft Type</p>
              {/* <p style={{color: 'gray'}}>{aircraft}</p> */}
              <Badge theme="primary">{aircraft}</Badge>
            </div>
          </div>
        <br />
          <div className={"subdetailsFlex"}>
            <div>
              <p style={{ fontSize: 14 }}>Altitude</p>
              <p style={{color: 'gray'}}>{alt}</p>
            </div>
            <div>
              <p style={{ fontSize: 14 }}>Speed</p>
              <p style={{color: 'gray'}}>{spd}</p>
            </div>
            <div>
              <p style={{ fontSize: 14 }}>Heading</p>
              <p style={{color: 'gray'}}>{hd}</p>
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
    const distPassed = getDistance(depCoords, position);
    console.log(dist);
    console.log(distPassed);
    
    
    console.log(distPassed/dist)
    return Math.floor(distPassed/dist*100);
}
