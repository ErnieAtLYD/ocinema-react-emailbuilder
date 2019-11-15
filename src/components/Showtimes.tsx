import React from 'react';
import { Callout } from 'react-inky';
import moment from 'moment';
import _ from 'lodash';
import { IShowtimeTable, IRESTAPI, ShowtimesProps } from '../types';

const Showtimes = ({ showtimes }: ShowtimesProps) => {
  const result: IShowtimeTable[] = [];
  const resultList = _(showtimes)
    .groupBy(v => moment(v.start_date).format('ddd, MMM Do'))
    .value();

  _.forEach(resultList, function(elem, key) {
    result.push({
      showDate: key,
      showTimes: elem
    });
  });

  result.map((value, index) => (
    <div key={value.showDate}>
      {value.showDate}
    </div>
  ));
  return (
    <Callout className="primary" size="12">
      {result.map((value, index) => (
        <>
          <strong>{value.showDate} - </strong>
          {value.showTimes.map( (showtime: IRESTAPI) => {
              return moment(showtime.start_date)
                .format('h:mm A')
            }).join(', ')}<br />
        </>
      ))}
    </Callout>
  )
}

export default Showtimes;
