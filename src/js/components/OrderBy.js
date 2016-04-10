import React from 'react';

export default class OrderBy extends React.Component {
  static propTypes = {
    orderBy: React.PropTypes.object.isRequired,
    handleOrderByChange: React.PropTypes.func.isRequired
  };

  orderByChange = (event) => {
    if (event.target.value) {
      const [value, ascendingText] = event.target.value.split(' ');
      const ascending = ascendingText === 'ascending';
      this.props.handleOrderByChange(value, ascending);
    } else {
      this.props.handleOrderByChange(null, true);
    }
  };

  render() {
    const { orderBy } = this.props;
    let currentValue = '';
    if (orderBy.get('value')) {
      const ascending = this.props.orderBy.get('ascending') ? 'ascending' : 'descending';
      currentValue = `${this.props.orderBy.get('value')} ${ascending}`;
    }

    return (
      <div className="order-by">
        Order by<br/>
        <select
          value={currentValue}
          onChange={this.orderByChange}
        >
          <option value="">Default</option>
          <option value="age ascending">Age &uarr;</option>
          <option value="age descending">Age &darr;</option>
          <option value="rate ascending">Rate &uarr;</option>
          <option value="rate descending">Rate &darr;</option>
        </select>
      </div>
    );
  }
}
