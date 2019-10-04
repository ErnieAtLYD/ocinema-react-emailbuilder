import React from 'react';
import { Callout } from 'react-inky';
import moment from 'moment';
import _ from 'lodash';

const Showtimes = ({ showtimes }) => {
  const result = [];
  const resultList = _(showtimes)
    .groupBy(v => moment(v.start_date).format('ddd, MMM Do'))
    .value();

  _.forEach(resultList, function(elem, key) {
    result.push({
      showDate: key,
      showTimes: elem
    });
  });

  result.map((value, index) => <div>{value.showDate}</div>);
  return (
    <Callout className="secondary">
      {result.map((value, index) => (
        <small>
          <strong>{value.showDate}: </strong>
          {value.showTimes.map( (showtime) => {
            return moment(showtime.start_date).format('h:mm A')
          } ).join(', ')}<br />
        </small>
      ))}
    </Callout>
  )
}

export default Showtimes;
