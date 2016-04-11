import React from 'react';
import ArtistListItem from './ArtistListItem';
import ArtistMap from './ArtistMap';

export default class Artists extends React.Component {
  static propTypes = {
    artists: React.PropTypes.object.isRequired,
    filters: React.PropTypes.object.isRequired,
    orderBy: React.PropTypes.object.isRequired,
    showMap: React.PropTypes.bool.isRequired,
    limit: React.PropTypes.number.isRequired
  }

  getFilteredArtists() {
    const { artists, filters } = this.props;
    const [minAge, maxAge] = filters.get('age').toJS();
    const [minRate, maxRate] = filters.get('rate').toJS();

    return artists.filter((artist) => {
      return artist.get('age') >= minAge
        && artist.get('age') <= maxAge
        && artist.get('rate') >= minRate
        && artist.get('rate') <= maxRate
        && filters.getIn(['gender', artist.get('gender')]);
    });
  }

  orderArtistList(artists) {
    const { orderBy } = this.props;
    const value = orderBy.get('value');
    const ascending = orderBy.get('ascending');
    if (value && ascending) {
      return artists.sort((artistA, artistB) => {
        return artistA.get(value) - artistB.get(value);
      });
    } else if (value && !ascending) {
      return artists.sort((artistA, artistB) => {
        return artistB.get(value) - artistA.get(value);
      });
    } else {
      return artists;
    }
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

  getLimitMessage(filteredArtists) {
    if (filteredArtists.size > this.props.limit) {
      return (
        <div ref="limitMessage" className="artists__limit-message">
          Displaying {this.props.limit} of {filteredArtists.size} possible results, try a more specific search to see the remaining results
        </div>
      );
    }
  }

  render() {
    const filteredArtists = this.getFilteredArtists();
    const limitMessage = this.getLimitMessage(filteredArtists);
    const limitedFilteredArtists = filteredArtists.take(this.props.limit);
    let content;
    if (this.props.showMap) {
      content = this.generateArtistMap(limitedFilteredArtists);
    } else {
      const orderedArtists = this.orderArtistList(limitedFilteredArtists);
      content = this.generateArtistList(orderedArtists);
    }

    return (
      <div className="artists">
        {limitMessage}
        {content}
      </div>
    );
  }
}
