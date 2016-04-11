import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

export default class ArtistMap extends React.Component {
  static propTypes = {
    artists: React.PropTypes.object.isRequired
  };

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
              height: '100%'
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            defaultZoom={12}
            defaultCenter={{ lat: 51.5074, lng: -0.12 }}
          >
            {markers}
          </GoogleMap>
        }
      />
    );
  }
}
