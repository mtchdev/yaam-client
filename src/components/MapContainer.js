import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer } from "react-leaflet";
import { connect } from "react-redux";
import "../assets/css/tooltip.css";
import fetchAllAircraftDataAction from "../lib/fetchAllAircraftData";
import fetchAircraftExtendedData from "../lib/focusOnAircraft";
import {
  getAllAircraftError,
  getAllAircraftPending,
  getAllAircraft
} from "../redux/reducers/aircraftDataReducer";
import FIRPolygons from "./map_components/FIRPolys";
import AircraftMarkerManager from "./map_components/AircraftMarkerManager";
import AircraftPath from "./map_components/AircraftPath";

const DEFAULT_BOUNDS = L.latLngBounds(L.latLng(90, -180), L.latLng(-90, 180));
const UPDATE_TIME = 30;

const TILES = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const ATTR ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
const DEFAULT_CENTER = [30, 0];
const DEFAULT_ZOOM_LEVEL = 3;

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

    const { bounds } = this.state;
    const { allAircraft, focusedData } = this.props;
    const { pilots, atc } = allAircraft;

    const trail = focusedData != null ? focusedData.trail : null;

    
    return (
      <Map
        ref="map"
        preferCanvas={true}
        center={DEFAULT_CENTER}
        maxBounds={DEFAULT_BOUNDS}
        maxBoundsViscosity={0.9}
        zoom={DEFAULT_ZOOM_LEVEL}
        minZoom={DEFAULT_ZOOM_LEVEL}
        id="mapid"
        doubleClickZoom={false}
        style={{ height: "100%" }}
        zoomControl={false}
      >
        <TileLayer attribution={ATTR} url={TILES} />
          <AircraftMarkerManager pilots={pilots} bounds={bounds} />
          <FIRPolygons atc={atc} />
          <AircraftPath {...{trail}} />
      </Map>
    );
  }

  /*
        The map will rerender only if the bounds are changed or new data is loaded.
        This includes the inital FIR load which is done AFTER mounting the component.
    */
  shouldComponentUpdate = (nextProps, nextState) => {
    if ((this.props.pending && !nextProps.pending) ||
        this.state.bounds !== nextState.bounds ||
        this.props.allAircraft !== nextProps.allAircraft ||
        this.state.FIRs !== nextState.FIRs ) return true;

    return false;
  };

  componentDidMount = () => {
    const { fetchAllData } = this.props;
    const { addBoundsChangeListener } = this;

    fetchAllData();

    addBoundsChangeListener();

    setInterval(this.updateData, UPDATE_TIME * 1000);
  };

  // Adds leaflet listener that updates the bounds in our state.
  addBoundsChangeListener = () => {
    this.refs.map.leafletElement.on("moveend", e => {
      const map = e.target;
      const bounds = map.getBounds();
      this.setState({ bounds });
    });
  }

  // Dispatches all redux data-fetching actions.
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
}

const mapStateToProps = state => ({
  error: getAllAircraftError(state),
  allAircraft: getAllAircraft(state),
  pending: getAllAircraftPending(state),
  focusedData: state.focusedData,
  focused: state.focused
});

const mapDispatchToProps = {
  fetchAllData: fetchAllAircraftDataAction,
  fetchAircraftExtendedData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
