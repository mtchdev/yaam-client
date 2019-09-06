import React, { Component } from 'react'
import { Polygon } from "react-leaflet";

export default class FIRPoly extends Component {
    render() {
        return (
            <Polygon
            ref="polygon"
            {...this.props}
          />
        )
    }

    // Only way to change the fill property after mounting
    shouldComponentUpdate(newProps, _newState) {
        this.refs.polygon.leafletElement.setStyle({ fill: newProps.fill });
        return true;
    }
}
