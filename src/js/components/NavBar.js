import React from 'react';
import Filters from './Filters';

export default class NavBar extends React.Component {
  static propTypes = {
    smallBrowserMode: React.PropTypes.bool,
    artists: React.PropTypes.object.isRequired,
    filters: React.PropTypes.object.isRequired,
    orderBy: React.PropTypes.object.isRequired,
    showMap: React.PropTypes.bool.isRequired,
    handleFilterChange: React.PropTypes.func.isRequired,
    handleGenderFilterChange: React.PropTypes.func.isRequired,
    handleOrderByChange: React.PropTypes.func.isRequired,
    handleToggleMap: React.PropTypes.func.isRequired
  };

  state = {
    showFilters: false
  };

  getTitle() {
    if (this.props.smallBrowserMode) {
      return 'AF';
    } else {
      return 'Artist Finder';
    }
  }

  getMiddleSection() {
    if (this.props.smallBrowserMode) {
      const text = this.state.showFilters ? 'Hide filters' : 'Show filters';
      return (
        <div
          className="nav-bar__toggle-filters"
          onClick={this.toggleFilters}
        >
          <span className="nav-bar__toggle-filters-text">{text}</span>
        </div>
      );
    } else {
      return this.getFilters();
    }
  }

  getMapToggle() {
    let mapToggleText;
    let mapToggleIcon;
    if (this.props.showMap) {
      mapToggleText = "Show as list";
      mapToggleIcon = <i className="fa fa-th-list"></i>;
    } else {
      mapToggleText = "Show on map";
      mapToggleIcon = <i className="fa fa-map-marker"></i>;
    }

    if (this.props.smallBrowserMode) {
      return <span>{mapToggleIcon}</span>;
    } else {
      return <span>{mapToggleText} {mapToggleIcon}</span>;
    }
  }

  getDropDown() {
    if (this.props.smallBrowserMode && this.state.showFilters) {
      return this.getFilters();
    }
  }

  getFilters() {
    return (
      <Filters
        artists={this.props.artists}
        filters={this.props.filters}
        orderBy={this.props.orderBy}
        handleFilterChange={this.props.handleFilterChange}
        handleGenderFilterChange={this.props.handleGenderFilterChange}
        handleOrderByChange={this.props.handleOrderByChange}
      />
    );
  }

  toggleFilters = () => {
    this.setState({ showFilters: !this.state.showFilters });
  };

  render() {
    const title = this.getTitle();
    const mapToggle = this.getMapToggle();
    const middleSection = this.getMiddleSection();
    const dropDown = this.getDropDown();

    return (
      <div className="nav-bar">
        <div className="nav-bar__title">{title}</div>
        <div className="nav-bar__filters">{middleSection}</div>
        <div className="nav-bar__map-toggle">
          <span className="nav-bar__map-toggle-text" onClick={this.props.handleToggleMap}>
            {mapToggle}
          </span>
        </div>
        {dropDown}
      </div>
    );
  }
}
