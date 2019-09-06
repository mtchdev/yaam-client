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
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
const DEFAULT_CENTER = [30, 0];
const DEFAULT_ZOOM_LEVEL = 3;

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      FIRs: null,
      bounds: L.latLngBounds(L.latLng(90, -180), L.latLng(-90, 180)),
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM_LEVEL,
    };
  }

  render() {
    const { bounds, zoom, center } = this.state;
    const { allAircraft, focusedData, settings} = this.props;
    const { pilots, atc } = allAircraft;

    let focusedTrail, focusedLocalPosition;

    /* For issues where the trail might not be in sync with the map, we also pass the 
       aircrafts positon on the map, for the AircraftPath to match between them. */
    if (focusedData) {
      focusedTrail = focusedData.trail;
      focusedLocalPosition = this.getLocalPostion(focusedData.callsign);
    }

    const tiles = settings.isDarkMode ? DARK_TILES : LIGHT_TILES;
    return (
      <Map
        ref="map"
        center={center}
        maxBounds={DEFAULT_BOUNDS}
        maxBoundsViscosity={0.9}
        zoom={zoom}
        minZoom={DEFAULT_ZOOM_LEVEL}
        id="mapid"
        doubleClickZoom={false}
        style={{ height: "100%" }}
        zoomControl={false}
      >
        <TileLayer attribution={ATTR} url={tiles} />
        <AircraftMarkerManager isDarkMode={settings.isDarkMode} theme={settings.themeColors} focusedData={focusedData} pilots={pilots} bounds={bounds} zoom={zoom} alwaysShowTooltip={true} />
        <FIRPolygons atc={atc} show={settings.toggleFIRs}/>
        <AircraftPath trail={focusedTrail} localPosition={focusedLocalPosition} />
      </Map>
    );
  }

  componentDidMount = () => {
    const { fetchAllData } = this.props;
    const { addBoundsChangeListener } = this;

    fetchAllData();
    addBoundsChangeListener();
    setInterval(this.updateData, UPDATE_TIME * 1000);
  };

  // The map will rerender only if the viewport is changed or new data is loaded.
  shouldComponentUpdate = (nextProps, nextState) => {

    if(nextProps.allAircraft !== this.props.allAircraft) return true;
    if(nextProps.focused !== this.props.focused) return true;
    if(nextState.bounds !== this.state.bounds) return true;
    if(nextState.center !== this.state.center) return true;
    if(this.props.settings !== nextProps.settings) return true;

    return false
  };

  // For checking if the map should goTo the focused aircrat.
  componentDidUpdate(prevProps, prevState) {

    // If the searchbar calls a focus, It'll set the goToFocused prop to true.
    if(this.props.focused && !prevProps.focused){
      if(this.props.goToFocused) {
        this.goTo(this.props.focusedData)
      }
    }
  }

  /**** Non-Lifecycle related Functions ****/

  // Adds leaflet listener that updates the bounds in our state.
  addBoundsChangeListener = () => {
    this.refs.map.leafletElement.on("moveend", e => {
      console.log("bounds update");
      
      const map = e.target;
      const zoom = map.getZoom();
      const center = map.getCenter();
      const bounds = map.getBounds();
      this.setState({ bounds, zoom, center });
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
    if (!pending && focusedData != null) {
      fetchAircraftExtendedData(focusedData.callsign);
    }
  };

  // Changes the map viewport to focus on the focused aircraft
  goTo = (station) => {
    const { coords } = station;
      this.setState({center: [coords.lat, coords.long ], zoom: 8})
  };

  // Gets the position of a focused aircraft on the map.
  getLocalPostion = (callsign) => {
    if (!this.props.allAircraft || !this.props.focused) return null;

    for (const aircraft of this.props.allAircraft.pilots) {
      if (aircraft.callsign === callsign){
        return aircraft.coords
      };
    }
  }
}

/** Redux Related Functions  **/
  
const mapStateToProps = state => ({
  error: getAllAircraftError(state),
  allAircraft: getAllAircraft(state),
  pending: getAllAircraftPending(state),
  focusedData: state.focusedData,
  focused: state.focused,
  settings: state.settings,
  goToFocused: state.goToFocused
});

const mapDispatchToProps = {
  fetchAllData: fetchAllAircraftDataAction,
  fetchAircraftExtendedData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);

