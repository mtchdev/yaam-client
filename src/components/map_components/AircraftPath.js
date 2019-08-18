import React, { Component } from 'react'
import { Polyline } from "react-leaflet";
export default class AircraftPath extends Component {
    render() {
        const { trail } = this.props;
        if (trail !== null) {
            return (<Polyline positions={trail} />);
        } else {
            return null;
        }
    }
}
