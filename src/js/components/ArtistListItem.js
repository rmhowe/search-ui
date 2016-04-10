import React from 'react';

export default class Artist extends React.Component {
  static propTypes = {
    gender: React.PropTypes.string.isRequired,
    age: React.PropTypes.number.isRequired,
    rate: React.PropTypes.number.isRequired,
    longitude: React.PropTypes.string.isRequired,
    latitude: React.PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="artist-list-item">
        <span className="artist-list-item__label">Age</span> {this.props.age}<br/>
        <span className="artist-list-item__label">Gender</span> {this.props.gender}<br/>
        <span className="artist-list-item__label">Rate</span> {this.props.rate}<br/>
      </div>
    );
  }
}
