import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import {
  fetchData
} from '../actions';


class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchData('data/artists.json'));
  }

  render() {
    const artists = this.props.artists.map((artist, i) => {
      return <span key={artist.get('uuid')}>{artist.get('age')}</span>;
    });
    return (
      <div className="app">
        <div className="container">
          {artists}
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    activeFilters: state.activeFilters,
    artists: state.artists
  };
}

export default connect(select)(App);
