import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import Immutable from 'immutable';

export default class ArtistMap extends React.Component {
  static propTypes = {
    artists: React.PropTypes.object.isRequired
  };

  state = {
    openInfoWindows: Immutable.Map()
  };

  handleMarkerClick(artist) {
    this.setState({
      openInfoWindows: this.state.openInfoWindows.set(artist.get('uuid'), true)
    });
  }

  handleInfoWindowClose(artist) {
    this.setState({
      openInfoWindows: this.state.openInfoWindows.set(artist.get('uuid'), false)
    });
  }

  getArtistMarkers() {
    return this.props.artists.map((artist, i) => {
      const infoWindow = this.getInfoWindow(artist);
      return (
        <Marker
          key={artist.get('uuid')}
          position={{
            lat: parseFloat(artist.get('latitude')),
            lng: parseFloat(artist.get('longitude'))
          }}
          onClick={this.handleMarkerClick.bind(this, artist)}
        >
          {infoWindow}
        </Marker>
      );
    });
  }

  getInfoWindow(artist) {
    if (this.state.openInfoWindows.get(artist.get('uuid'))) {
      return (
        <InfoWindow onCloseclick={this.handleInfoWindowClose.bind(this, artist)}>
          <div>
            <strong>Age</strong> {artist.get('age')}<br/>
            <strong>Gender</strong> {artist.get('gender')}<br/>
            <strong>Rate</strong> {artist.get('rate')}
          </div>
        </InfoWindow>
      );
    }
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
