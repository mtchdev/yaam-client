import React, { Component } from "react";
import L from "leaflet";
import Marker from "./AircraftMarker";
import AircraftTooltip from "./AircraftTooltip";

const defaultRotationAngle = 0;
const SHOW_GROUND_ZOOM_LEVEL = 10;
const ON_GROUND_MAX_SPEED = 50;

export default class AircraftMarkerManager extends Component {
  render() {
    const { pilots, bounds, focusedData, zoom,
             } = this.props;
    const iconSize = zoom+19;
    
    let alwaysShowToolTip = true;
    
    const iconUrl = this.props.isDarkMode ? "airplane_dark.png" :  "airplane_light.png";

    return pilots.map((flight, index) => {
      let showTooltip = false;
      if(this.shouldRender(flight, bounds, zoom)){
        if (focusedData) {
          if (flight.callsign === focusedData.callsign) {
            showTooltip = true;
          }
        }
  
        return (
          <Marker
            key={index}
            callsign={flight.callsign}
            position={[flight.coords.lat, flight.coords.long]}
            rotationAngle={parseInt(flight.heading - defaultRotationAngle)}
            icon={L.icon({ iconUrl, iconAnchor: [iconSize/2, iconSize/2], iconSize: [iconSize, iconSize] })}
          >
            <AircraftTooltip key={index} theme={this.props.theme} visible={showTooltip} data={flight} />
          </Marker>
        );
      }
    });
  }
  
  shouldRender(flight, bounds, zoom) {
    if (this.isInBounds(flight.coords, bounds) && flight.speed > ON_GROUND_MAX_SPEED) return true;
    if (this.isInBounds(flight.coords, bounds) && zoom > SHOW_GROUND_ZOOM_LEVEL) return true;
    return false;
  }

  // Checks if given coordinates are in given bounds
  isInBounds = (coords, bounds) => {
    if (
      coords.lat === null ||
      coords.long === null) return false;
    
    return (
      coords.lat > bounds.getSouth() &&
      coords.lat < bounds.getNorth() &&
      coords.long > bounds.getWest() &&
      coords.long < bounds.getEast()
    );
  };
}
