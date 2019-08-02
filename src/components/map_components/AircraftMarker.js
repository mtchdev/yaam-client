import React from 'react';
import { connect } from 'react-redux'
import { Marker as LeafletMarker } from 'leaflet';
import { LeafletProvider, withLeaflet, MapLayer } from 'react-leaflet';
import 'leaflet-rotatedmarker';
import fetchAircraftExtendedData from "../../lib/focusOnAircraft";
import { unFocusAircraft } from "../../redux/actions";

class RotatedMarker extends MapLayer {
  static defaultProps = {
    rotationOrigin: 'center',
  };

  createLeafletElement(props) {
    const el = new LeafletMarker(props.position, this.getOptions(props));
    el.on('click', () => this.handleClick(this.props))
    this.contextValue = { ...props.leaflet, popupContainer: el };
    return el;
  }

  updateLeafletElement(fromProps, toProps) {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setLatLng(toProps.position);
    }
    if (toProps.icon !== fromProps.icon) {
      this.leafletElement.setIcon(toProps.icon);
    }
    if (toProps.zIndexOffset !== fromProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(toProps.zIndexOffset);
    }
    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity);
    }
    if (toProps.draggable !== fromProps.draggable) {
      if (toProps.draggable === true) {
        this.leafletElement.dragging.enable();
      } else {
        this.leafletElement.dragging.disable();
      }
    }
    if (toProps.rotationAngle !== fromProps.rotationAngle) {
      this.leafletElement.setRotationAngle(toProps.rotationAngle);
    }
    if (toProps.rotationOrigin !== fromProps.rotationOrigin) {
      this.leafletElement.setRotationOrigin(toProps.rotationOrigin);
    }
  }

  handleClick(props) {
    const { focused, fetchAircraftExtendedData, unFocusAircraft } = props;
    if(!focused){
      fetchAircraftExtendedData();
    } else {
      unFocusAircraft();
    }
  }

  render() {
    const { children } = this.props;
    return children == null || this.contextValue == null ? null : (
        <LeafletProvider value={this.contextValue}>{children}</LeafletProvider>   
    );
  }
}

const mapStateToProps = (state) => ({
  focused: state.focused
})

const mapDispatchToProps = {
  fetchAircraftExtendedData,
  unFocusAircraft
}


export default connect(mapStateToProps, mapDispatchToProps)(withLeaflet(RotatedMarker));
