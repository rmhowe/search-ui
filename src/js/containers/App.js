import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Header from '../components/Header';
import ArtistList from '../components/ArtistList';
import Artist from '../components/Artist';
import ReactSlider from 'react-slider';
import {
  fetchData,
  setFilter
} from '../actions';


class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchData('data/artists.json')).then(() => {
      this.setInitialFilters();
    });
  }

  setInitialFilters = () => {
    const artists = this.props.artists;
    this.props.dispatch(setFilter('age', this.getMinMax('age')));
    this.props.dispatch(setFilter('rate', this.getMinMax('rate')));
    this.props.dispatch(setFilter('gender', Immutable.List('M', 'F')));
  };

  getMinMax(type) {
    const values = this.props.artists.map(artist => artist.get(type)).toJS();
    const min = Math.min.apply(Math, values);
    const max = Math.max.apply(Math, values);
    return Immutable.List([min, max]);
  }

  handleFilterChange = (filter, value) => {
    this.props.dispatch(setFilter(filter, value));
  };

  render() {
    return (
      <div className="app">
        <div className="container">
          <Header
            artists={this.props.artists}
            activeFilters={this.props.activeFilters}
            handleFilterChange={this.handleFilterChange}
          />
          <ArtistList
            artists={this.props.artists}
            activeFilters={this.props.activeFilters}
          />
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
