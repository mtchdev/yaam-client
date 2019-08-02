import React, { Component } from 'react'
import L from 'leaflet'
import {Map, TileLayer, Popup, Polyline, LatLngL} from 'react-leaflet';
import Marker from "./map_components/AircraftMarker";
import { connect } from 'react-redux';

import fetchAllAircraftDataAction from "../lib/fetchAllAircraftData";
// import { getAircraftError, getAircraftPending, getAircraft } from "../redux/reducers/aircraftFocus";
import { getAllAircraftError, getAllAircraftPending, getAllAircraft } from "../redux/reducers/aircraftDataReducer";

class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {data: []}
    }
    
    render() {
        const stamenTonerTiles = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
        const stamenTonerAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
        const mapCenter = [30, 0];
        const zoomLevel = 3;
        const bounds = L.latLngBounds(L.latLng(90, -180), L.latLng(-90, 180));
        const defaultRotationAngle = 45;
        const { allAircraft, pending, focused } = this.props;
        
        // If an aircraft is focused, this will show the polyline
        let polyline = null;
        if(focused && !pending){
            polyline = (<Polyline positions={this.props.focusedData.trail}/>)
        }

        return (
            <Map center={mapCenter} maxBounds={bounds} maxBoundsViscosity={0.9} zoom={zoomLevel} minZoom={zoomLevel} id='mapid' style={{height: '100%'}}>
                <TileLayer attribution={stamenTonerAttr}  url={stamenTonerTiles}/>
                {
                    allAircraft.map(flight => {
                        return(
                            <Marker 
                            position={[flight.coords.lat, flight.coords.long]} 
                            rotationAngle={parseInt(flight.heading - defaultRotationAngle)}
                            icon={L.icon({iconUrl: 'airplane.png', iconAnchor: [16, 16]})} >
                            
                                <Popup>
                                    <p style={{fontWeight: 'bold', fontSize: 14 }}>{flight.callsign}</p>
                                    {flight.pilotName}
                                    <br />
                                    {`${flight.dep.code.iata} => ${flight.arr.code.iata}`}
                                </Popup>
                            </Marker>
                        );
                    })
                }
                {polyline}
            </Map>
        )
    }


    componentDidMount = () => {
        const { fetchAllData } = this.props
        fetchAllData();
    }
    
}

const mapStateToProps = (state) => ({
    error: getAllAircraftError(state),
    allAircraft: getAllAircraft(state),
    pending: getAllAircraftPending(state),
    focused: state.focused,
    focusedData: state.focusedData
})

const mapDispatchToProps = {
    fetchAllData: fetchAllAircraftDataAction
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MapContainer);


