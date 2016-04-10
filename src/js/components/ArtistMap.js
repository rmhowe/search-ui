import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

export default class ArtistMap extends React.Component {
  getArtistMarkers() {
    return this.props.artists.map((artist) => {
      return (
        <Marker
          key={artist.get('uuid')}
          position={{
            lat: parseFloat(artist.get('latitude')),
            lng: parseFloat(artist.get('longitude'))
          }}
        />
      );
    });
  }

  render() {
    const markers = this.getArtistMarkers();
    return (
      <GoogleMapLoader
        containerElement={
          <div
            {...this.props}
            style={{
              height: "100%",
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            defaultZoom={11}
            defaultCenter={{ lat: 51.5074, lng: -0.1 }}
          >
            {markers}
          </GoogleMap>
        }
      />
    );
  }
}
