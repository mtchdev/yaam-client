import React, { Component } from 'react'
import { Polyline } from "react-leaflet";
export default class AircraftPath extends Component {
    render() {
        let { trail, localPosition } = this.props;
        if (trail != null) {

            trail = trail.filter((point) => {
                const {lat, lng, alt} = point;
                return (lat != null && lng != null && alt != null);
            })

            // Somtimes the client and server are not in sync (when requesting a focused aircraft), so we make sure the trail isn't ahead.
            if(trail[0].lat !== localPosition.lat || trail[0].lng !== localPosition.long){
                console.log("oops its ahead");
                trail.shift()
            }

            return (<Polyline positions={trail} />);
        } else {
            return null;
        }
    }
}
