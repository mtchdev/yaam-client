import React, { Component } from 'react';
import { Tooltip } from "react-leaflet";

export default class AircraftTooltip extends Component {

    getLogoFromCallsign = (callsign) => {
        if (isAirline(callsign)){
            const airlineCode = callsign.substr(0, 3);
            const url = `https://planefinder.net/flightstat/v2/getLogo3x.php?airlineCode=${airlineCode}&requestThumb=1`
            return (
                <div style={{paddingRight: 10, width: '6em'}}>
                    <img style={{maxWidth: '100%', height: 'auto'}} src={url} alt={""}/>
                </div>
            );
        }
        return null;
    }

    

    
    render() {
        const { callsign, dep, arr, aircraft, visible } = this.props.data;
        const { theme } = this.props;
        return (
            <Tooltip permanent={visible} offset={[0, -10]} direction={"top"} style={{border: "none"}}>
                <div style={{padding: 5, backgroundColor: theme.primary, borderColor: theme.primary, color: theme.textPrimary}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            {this.getLogoFromCallsign(callsign)}
                            <div>
                                <p style={{margin: 0, fontWeight: 'bold'}}>{callsign}</p>
                                <p style={{margin: 0, color: 'gray'}}>{dep.code.icao} - {arr.code.icao}</p>
                            </div>
                    </div>
                </div>
            </Tooltip>
        )
    }
}

const isAirline = (callsign) => {
    if(callsign.match(/[A-Z]{3}\d.*/g) !== null) return true;
    return false;
}