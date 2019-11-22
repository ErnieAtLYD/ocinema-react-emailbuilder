// @flow
import React from "react";
import {Callout} from "react-inky";
import moment from "moment";
import _ from "lodash";

type ShowtimesType = {
  showtimes: Array<string>,
};

type ShowDateType = {
  showDate: string,
  showTimes: Array<{start_date: string}>,
};

const Showtimes = ({showtimes}: {showtimes: ShowtimesType}): React$Element<any> => {
  const result: Array<ShowDateType> = [];
  const resultList: Array<string> = _(showtimes)
    .groupBy(v => moment(v.start_date).format("ddd, MMM Do"))
    .value();

  _.forEach(resultList, function(elem: any, key: string): void {
    result.push({
      showDate: key,
      showTimes: elem,
    });
  });

  result.map((value: ShowDateType, index: number): React$Element<"div"> => (
    <div>{value.showDate}</div>
  ));

  return (
    <Callout className="primary" size="12">
      {result.map((value: ShowDateType, index: number): React$Element<
        ({children?: React$Node}) => React$Node
      > => (
        <>
          <strong>{value.showDate} - </strong>
          {value.showTimes
            .map((showtime: {start_date: string}): any => {
              return moment(showtime.start_date).format("h:mm A");
            })
            .join(", ")}
          <br />
        </>
      ))}
    </Callout>
  );
};

export default Showtimes;
