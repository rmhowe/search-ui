import React from 'react';
import Filters from './Filters';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header__title">Artist Finder</div>
        <Filters
          artists={this.props.artists}
          activeFilters={this.props.activeFilters}
          handleFilterChange={this.props.handleFilterChange}
          handleGenderFilterChange={this.props.handleGenderFilterChange}
        />
      </div>
    );
  }
}
