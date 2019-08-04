import React, { Component } from 'react'
import L from 'leaflet'
import {Map, TileLayer, Polyline} from 'react-leaflet';
import Marker from "./map_components/AircraftMarker";
import AircraftTooltip from "./map_components/AircraftTooltip";
import { connect } from 'react-redux';
import '../assets/css/tooltip.css';
import fetchAllAircraftDataAction from "../lib/fetchAllAircraftData";
// import { getAircraftError, getAircraftPending, getAircraft } from "../redux/reducers/aircraftFocus";
import { getAllAircraftError, getAllAircraftPending, getAllAircraft } from "../redux/reducers/aircraftDataReducer";

class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {data: []}
    }
    
    render() {
        const tiles = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
        const attr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
        const mapCenter = [30, 0];
        const zoomLevel = 3;
        const bounds = L.latLngBounds(L.latLng(90, -180), L.latLng(-90, 180));
        const defaultRotationAngle = 45;
        const { allAircraft, pending, focused, focusedData } = this.props;
        
        // If an aircraft is focused, this will show the polyline
        let polyline = null;
        if(focused && !pending){
            polyline = (<Polyline positions={this.props.focusedData.trail}/>)
        }

        return (
            <Map ref='map' center={mapCenter} maxBounds={bounds} maxBoundsViscosity={0.9} zoom={zoomLevel} minZoom={zoomLevel} id='mapid' doubleClickZoom={false} style={{height: '100%'}} zoomControl={false}>
                <TileLayer attribution={attr}  url={tiles}/>
                {
                    allAircraft.map((flight, index) => {
                        let showTooltip = false;
                        if (flight.coords.lat === null || flight.coords.long === null) { return null }
                        if (flight.callsign === focusedData){ showTooltip = true }
                        return(
                            <Marker 
                            key={index}
                            callsign={flight.callsign}
                            position={[flight.coords.lat, flight.coords.long]} 
                            rotationAngle={parseInt(flight.heading - defaultRotationAngle)}
                            icon={L.icon({iconUrl: 'airplane.png', iconAnchor: [16, 16]})} >
                            
                            <AircraftTooltip visible={showTooltip} data={flight} />

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


        this.refs.map.leafletElement.on('moveend', (e) => {
            const map = e.target;
            const bounds = map.getBounds()
            this.setState({bounds})
            
        });

        
    }

    isInBounds = (coords, bounds) => {
        // TODO: Implement
    }
    

    componentDidUpdate = () => {
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


