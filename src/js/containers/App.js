import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Header from '../components/Header';
import Artists from '../components/Artists';
import ReactSlider from 'react-slider';
import {
  fetchData,
  setFilter,
  setGenderFilter,
  toggleMap
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

  handleGenderFilterChange = (gender, value) => {
    this.props.dispatch(setGenderFilter(gender, value));
  };

  handleToggleMap = () => {
    this.props.dispatch(toggleMap());
  };

  render() {
    return (
      <div className="app">
        <Header
          artists={this.props.artists}
          activeFilters={this.props.activeFilters}
          showMap={this.props.showMap}
          handleFilterChange={this.handleFilterChange}
          handleGenderFilterChange={this.handleGenderFilterChange}
          handleToggleMap={this.handleToggleMap}
        />
        <Artists
          artists={this.props.artists}
          activeFilters={this.props.activeFilters}
          showMap={this.props.showMap}
        />
      </div>
    );
  }
}

function select(state) {
  return {
    activeFilters: state.activeFilters,
    artists: state.artists,
    showMap: state.showMap
  };
}

export default connect(select)(App);
