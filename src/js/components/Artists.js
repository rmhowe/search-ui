import React from 'react';
import ArtistListItem from './ArtistListItem';
import ArtistMap from './ArtistMap';

export default class Artists extends React.Component {
  getFilteredArtists() {
    const { artists, activeFilters } = this.props;
    const [minAge, maxAge] = activeFilters.get('age').toJS();
    const [minRate, maxRate] = activeFilters.get('rate').toJS();

    return artists.filter((artist) => {
      return artist.get('age') >= minAge
        && artist.get('age') <= maxAge
        && artist.get('rate') >= minRate
        && artist.get('rate') <= maxRate
        && activeFilters.getIn(['gender', artist.get('gender')]);
    });
  }

  generateArtistList(artists) {
    return artists.map((artist) => {
      return (
        <ArtistListItem
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

  generateArtistMap(artists) {
    return (
      <ArtistMap
        artists={artists}
      />
    );
  }

  render() {
    const filteredArtists = this.getFilteredArtists();
    let content;
    if (this.props.showMap) {
      content = this.generateArtistMap(filteredArtists);
    } else {
      content = this.generateArtistList(filteredArtists);
    }

    return (
      <div className="artists">
        {content}
      </div>
    );
  }
}
