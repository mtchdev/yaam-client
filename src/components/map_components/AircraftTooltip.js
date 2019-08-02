import React, { Component } from 'react';
import { Tooltip } from "react-leaflet";
import {Container, Row, Col} from "shards-react";

export default class AircraftTooltip extends Component {

    getLogoFromCallsign = (callsign) => {
        // TODO: Implement
        return (
            <div style={{paddingRight: 10, width: '6em'}}>
                <img style={{maxWidth: '100%', height: 'auto'}} src={"https://planefinder.net/flightstat/v2/getLogo3x.php?airlineCode=EZY&requestThumb=1"} alt={""}/>
            </div>
        );
    }

    
    render() {
        const { callsign, dep, arr, aircraft, visible } = this.props.data;
        return (
            <div>
                <Tooltip permanent={visible} offset={[0, -10]} direction={"top"} >
                    <div style={{padding: 5}}>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                {this.getLogoFromCallsign(callsign)}
                                <div>
                                    <p style={{margin: 0, fontWeight: 'bold'}}>{callsign}</p>
                                    <p style={{margin: 0, color: 'gray'}}>{dep.code.icao} - {arr.code.icao}</p>
                                </div>
                        </div>
                    </div>
                </Tooltip>
            </div>
        )
    }
}