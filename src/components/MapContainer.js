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
} from "../redux/reducers/rootReducer";
import FIRPolygons from "./map_components/FIRPolys";
import AircraftMarkerManager from "./map_components/AircraftMarkerManager";
import AircraftPath from "./map_components/AircraftPath";

// Inital Constants

const DEFAULT_BOUNDS = L.latLngBounds(L.latLng(90, -180), L.latLng(-90, 180));
const UPDATE_TIME = 30;

const LIGHT_TILES = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const DARK_TILES = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
const ATTR =
  "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"https://carto.com/attributions\">CARTO</a>";
const DEFAULT_CENTER = [30, 0];
const DEFAULT_ZOOM_LEVEL = 3;

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      FIRs: null,
      bounds: L.latLngBounds(L.latLng(90, -180), L.latLng(-90, 180)),
      zoom: DEFAULT_ZOOM_LEVEL
    };
  }

  render() {
    const { bounds, zoom } = this.state;
    const { allAircraft, focusedData, settings} = this.props;
    const { pilots, atc } = allAircraft;

    const trail = focusedData ? focusedData.trail : null;
    const tiles = settings.isDarkMode ? DARK_TILES : LIGHT_TILES;
    return (
      <Map
        ref="map"
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
        <TileLayer attribution={ATTR} url={tiles} />
        <AircraftMarkerManager isDarkMode={settings.isDarkMode} theme={settings.themeColors} focusedData={focusedData} pilots={pilots} bounds={bounds} zoom={zoom} alwaysShowTooltip={true} />
        <FIRPolygons atc={atc} show={settings.toggleFIRs}/>
        <AircraftPath {...{ trail }} />
      </Map>
    );
  }

  /*
        The map will rerender only if the bounds are changed or new data is loaded.
  */
  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      (this.props.pending && !nextProps.pending) ||
      (this.props.focused && !nextProps.focused) ||
      this.state.bounds !== nextState.bounds ||
      this.props.settings !== nextProps.settings ||
      this.props.focusedData !== nextProps.focusedData
    )
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
      const zoom = map.getZoom();
      const bounds = map.getBounds();
      this.setState({ bounds, zoom });
    });
  };

  // Dispatches all redux data-fetching actions.
  updateData = () => {
    const {
      fetchAllData,
      fetchAircraftExtendedData,
      pending,
      focusedData
    } = this.props;

    fetchAllData();
    if (!pending && focusedData) {
      fetchAircraftExtendedData(focusedData.callsign);
    }
  };
}

const mapStateToProps = state => ({
  error: getAllAircraftError(state),
  allAircraft: getAllAircraft(state),
  pending: getAllAircraftPending(state),
  focusedData: state.focusedData,
  focused: state.focused,
  settings: state.settings
});

const mapDispatchToProps = {
  fetchAllData: fetchAllAircraftDataAction,
  fetchAircraftExtendedData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);

