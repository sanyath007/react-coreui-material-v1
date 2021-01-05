import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import * as parkData from '../../assets/data/skateboard-parks.json';
import mapStyles from './mapStyles';

function GMap() {
  const [selectedPark, setSelectedPark] = useState(null);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
      defaultOptions={{ styles: mapStyles }}
    >
      {parkData.features.map(park => (        
        <Marker
          key={park.properties.PARK_ID} 
          position={{ lat: park.geometry.coordinates[1], lng: park.geometry.coordinates[0] }}
          onClick={() => {
            setSelectedPark(park)
          }}
          icon={{
            url: "/skateboarding.svg",
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
      ))}
      
      {selectedPark && (
        <InfoWindow
          position={{ lat: selectedPark.geometry.coordinates[1], lng: selectedPark.geometry.coordinates[0] }}
          onCloseClick={() => {
            setSelectedPark(null);
          }}
        >
          <div>
            <h3>{selectedPark.properties.NAME}</h3>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>

  )
}

const WrappedMap = withScriptjs(withGoogleMap(GMap));

export default  WrappedMap;