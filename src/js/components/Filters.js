import React from 'react';
import ReactSlider from 'react-slider';
import Immutable from 'immutable';

export default class Filters extends React.Component {
  rangeFilterChange = (filter, value) => {
    this.props.handleFilterChange(filter, Immutable.List(value));
  };

  genderFilterChange = (gender, event) => {
    this.props.handleGenderFilterChange(gender, event.target.checked);
  };

  getSlider(filter, currentMin, currentMax) {
    const values = this.props.artists.map(artist => artist.get(filter)).toJS();
    if (values.length > 0) {
      const min = Math.min.apply(Math, values);
      const max = Math.max.apply(Math, values);

      return (
        <ReactSlider
          className="range-slider"
          min={min}
          max={max}
          defaultValue={[min, max]}
          withBars={true}
          onChange={this.rangeFilterChange.bind(this, filter)}
        />
      );
    }
  }

  render() {
    const [currentMinAge, currentMaxAge] = this.props.activeFilters.get('age').toJS();
    const [currentMinRate, currentMaxRate] = this.props.activeFilters.get('rate').toJS();
    const ageSlider = this.getSlider('age', currentMinAge, currentMaxAge);
    const rateSlider = this.getSlider('rate', currentMinRate, currentMaxRate);

    return (
      <div className="filters">
        <div className="filters__filter">
          Age: {currentMinAge || 0} - {currentMaxAge || 100}
          {ageSlider}
        </div>
        <div className="filters__filter">
          Rate: {currentMinRate || 0} - {currentMaxRate || 100}
          {rateSlider}
        </div>
        <div className="filters__filter">
          Gender<br/>
          <span className="filters__gender-label">M</span>
          <input
            type="checkbox"
            checked={this.props.activeFilters.get('gender').get('M')}
            onChange={this.genderFilterChange.bind(this, 'M')}
          />
          <span className="filters__gender-label">F</span>
          <input
            type="checkbox"
            checked={this.props.activeFilters.get('gender').get('F')}
            onChange={this.genderFilterChange.bind(this, 'F')}
          />
        </div>
      </div>
    );
  }
}
