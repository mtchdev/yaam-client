import React, { Component } from "react";
import L from "leaflet";
import Marker from "./AircraftMarker";
import AircraftTooltip from "./AircraftTooltip";

const defaultRotationAngle = 0;

export default class AircraftMarkerManager extends Component {
  render() {
    const { pilots, bounds, focusedData, zoom } = this.props;
    const iconSize = zoom+19;
    
    return pilots.map((flight, index) => {
      let showTooltip = false;
      if (
        flight.coords.lat === null ||
        flight.coords.long === null ||
        flight.altitude < 2000 ||
        !this.isInBounds(flight.coords, bounds)
      ) {
        return null;
      }

      if (flight.callsign === focusedData) {
        showTooltip = true;
      }
      return (
        <Marker
          key={index}
          callsign={flight.callsign}
          position={[flight.coords.lat, flight.coords.long]}
          rotationAngle={parseInt(flight.heading - defaultRotationAngle)}
          icon={L.icon({ iconUrl: "airplane.png", iconAnchor: [iconSize/2, iconSize/2], iconSize: [iconSize, iconSize] })}
        >
          <AircraftTooltip key={index} visible={showTooltip} data={flight} />
        </Marker>
      );
    });
  }

  // Checks if given coordinates are in given bounds
  isInBounds = (coords, bounds) => {
    return (
      coords.lat > bounds.getSouth() &&
      coords.lat < bounds.getNorth() &&
      coords.long > bounds.getWest() &&
      coords.long < bounds.getEast()
    );
  };
}
