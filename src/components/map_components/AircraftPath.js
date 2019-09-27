import React, { Component } from "react"
import { Polyline } from "react-leaflet";
export default class AircraftPath extends Component {
    render() {
        let trail = this.props;
        if (trail) {
            
            trail = trail.filter((point) => {
                const {lat, lng, alt} = point;
                return (lat != null && lng != null && alt != null);
            })

            return (<Polyline positions={trail} />);
        } else {
            return null;
        }
    }
}
