import React from 'react';
import Filters from './Filters';

export default class NavBar extends React.Component {
  static propTypes = {
    artists: React.PropTypes.object.isRequired,
    filters: React.PropTypes.object.isRequired,
    orderBy: React.PropTypes.object.isRequired,
    showMap: React.PropTypes.bool.isRequired,
    handleFilterChange: React.PropTypes.func.isRequired,
    handleGenderFilterChange: React.PropTypes.func.isRequired,
    handleOrderByChange: React.PropTypes.func.isRequired,
    handleToggleMap: React.PropTypes.func.isRequired
  };

  render() {
    let mapToggleText;
    let mapToggleIcon;
    if (this.props.showMap) {
      mapToggleText = "Show as list";
      mapToggleIcon = <i className="fa fa-th-list"></i>;
    } else {
      mapToggleText = "Show on map";
      mapToggleIcon = <i className="fa fa-map-marker"></i>;
    }

    return (
      <div className="nav-bar">
        <div className="nav-bar__title">Artist Finder</div>
        <Filters
          artists={this.props.artists}
          filters={this.props.filters}
          orderBy={this.props.orderBy}
          handleFilterChange={this.props.handleFilterChange}
          handleGenderFilterChange={this.props.handleGenderFilterChange}
          handleOrderByChange={this.props.handleOrderByChange}
        />
        <div className="nav-bar__map-toggle">
          <span className="nav-bar__map-toggle-text" onClick={this.props.handleToggleMap}>
            {mapToggleText} {mapToggleIcon}
          </span>
        </div>
      </div>
    );
  }
}
