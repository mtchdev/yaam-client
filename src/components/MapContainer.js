import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer, Polyline } from "react-leaflet";
import Marker from "./map_components/AircraftMarker";
import AircraftTooltip from "./map_components/AircraftTooltip";
import { connect } from "react-redux";
import "../assets/css/tooltip.css";
import fetchAllAircraftDataAction from "../lib/fetchAllAircraftData";
import fetchAircraftExtendedData from "../lib/focusOnAircraft";
// import { getAircraftError, getAircraftPending, getAircraft } from "../redux/reducers/aircraftFocus";
import {
  getAllAircraftError,
  getAllAircraftPending,
  getAllAircraft
} from "../redux/reducers/aircraftDataReducer";
import { FIRPolygons } from "./map_components/FIRPolys";

const DEFAULT_BOUNDS = L.latLngBounds(L.latLng(90, -180), L.latLng(-90, 180));

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      FIRs: null,
      bounds: L.latLngBounds(L.latLng(90, -180), L.latLng(-90, 180))
    };
  }

  render() {
    const tiles =
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
    const attr =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
    const mapCenter = [30, 0];
    const zoomLevel = 3;
    const defaultRotationAngle = 45;
    const { bounds, FIRs } = this.state;
    const { allAircraft, pending, focusedData } = this.props;
    const { pilots, atc } = allAircraft;

    // If an aircraft is focused, this will show the polyline
    let polyline = null;
    if (!pending && focusedData !== undefined) {
      polyline = <Polyline positions={this.props.focusedData.trail} />;
    }

    return (
      <Map
        ref="map"
        preferCanvas={true}
        center={mapCenter}
        maxBounds={DEFAULT_BOUNDS}
        maxBoundsViscosity={0.9}
        zoom={zoomLevel}
        minZoom={zoomLevel}
        id="mapid"
        doubleClickZoom={false}
        style={{ height: "100%" }}
        zoomControl={false}
      >
        <TileLayer attribution={attr} url={tiles} />
        {pilots.map((flight, index) => {
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
              icon={L.icon({ iconUrl: "airplane.png", iconAnchor: [16, 16] })}
            >
              <AircraftTooltip visible={showTooltip} data={flight} />
            </Marker>
          );
        })}

        {/* Render the path of the aircraft (if focused) and all the FIR polygons. */}
        {FIRPolygons(FIRs, atc)}
        {polyline}
      </Map>
    );
  }

  /*
        The map will rerender only if the bounds are changed or new data is loaded.
    */
  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.props.pending && !nextProps.pending) {
      return true;
    }

    if (this.state.bounds !== nextState.bounds) {
      return true;
    }

    if (this.props.allAircraft !== nextProps.allAircraft) {
      return true;
    }
    if (this.state.FIRs !== nextState.FIRs) {
      return true;
    }
    return false;
  };

  componentDidMount = () => {
    const { fetchAllData } = this.props;
    fetchAllData();
    this.fetchFIRData();

    this.refs.map.leafletElement.on("moveend", e => {
      const map = e.target;
      const bounds = map.getBounds();
      this.setState({ bounds });
    });

    setInterval(this.updateData, 30 * 1000);
  };

  updateData = () => {
    const {
      fetchAllData,
      fetchAircraftExtendedData,
      pending,
      focusedData
    } = this.props;

    fetchAllData();
    if (!pending && focusedData !== undefined) {
      fetchAircraftExtendedData(focusedData.callsign);
    }
  };

  // This data isn't expected to change, ever, so it would be overkill to keep it in our redux store.
  fetchFIRData = async () => {
    let data = await fetch(
      "https://v4p4sz5ijk.execute-api.us-east-1.amazonaws.com/anbdata/airspaces/zones/fir-list?api_key=04775150-c03c-11e9-ba38-ab1794fa7a73&format=json"
    );
    data = await data.json();
    this.setState({ FIRs: data });
  };

  isInBounds = (coords, bounds) => {
    return (
      coords.lat > bounds.getSouth() &&
      coords.lat < bounds.getNorth() &&
      coords.long > bounds.getWest() &&
      coords.long < bounds.getEast()
    );
  };
}

const mapStateToProps = state => ({
  error: getAllAircraftError(state),
  allAircraft: getAllAircraft(state),
  pending: getAllAircraftPending(state),
  focusedData: state.focusedData
});

const mapDispatchToProps = {
  fetchAllData: fetchAllAircraftDataAction,
  fetchAircraftExtendedData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
