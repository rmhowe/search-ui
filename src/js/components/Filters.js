import React from 'react';
import ReactSlider from 'react-slider';

export default class Filters extends React.Component {
  filterChange = (value) => {
    console.log(value);
  };

  getSlider(type, currentMin, currentMax) {
    const values = this.props.artists.map(artist => artist.get(type)).toJS();
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
          onAfterChange={this.filterChange}
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
          Gender:
          <input type="checkbox"/>
          <input type="checkbox"/>
        </div>
      </div>
    );
  }
}
