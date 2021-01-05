import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '97%',
  height: '94%',
};

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 14.985, lng: 102.099 }}
        onClick={(obj, map, {latLng}) => console.log(latLng.lat(), latLng.lng())}
      >
        <Marker position={{ lat: 14.962540, lng: 102.116053 }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_API
})(MapContainer);