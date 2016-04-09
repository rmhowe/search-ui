import React from 'react';
import Artist from './Artist';

export default class ArtistList extends React.Component {
  generateArtistList() {
    const { artists, activeFilters } = this.props;
    const [minAge, maxAge] = activeFilters.get('age').toJS();
    const [minRate, maxRate] = activeFilters.get('rate').toJS();

    return artists.filter((artist) => {
      return artist.get('age') > minAge
        && artist.get('age') < maxAge
        && artist.get('rate') > minRate
        && artist.get('rate') < maxRate;
    }).map((artist) => {
      return (
        <Artist
          key={artist.get('uuid')}
          gender={artist.get('gender')}
          age={artist.get('age')}
          rate={artist.get('rate')}
          longitude={artist.get('longitude')}
          latitude={artist.get('latitude')}
        />
      );
    });
  }

  render() {
    const artists = this.generateArtistList();

    return (
      <div className="artist-list">
        {artists}
      </div>
    );
  }
}
