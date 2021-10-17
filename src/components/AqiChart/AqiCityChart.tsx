import * as React from "react";
import AqiChart from "./AqiChart";
import { useDataConsumer } from "../data-provider/DataProvider";
import { relativeTimeToNow } from "../../utils";

const AqiCityChart: React.FC<{city: string}> = ({city}) => {
  const { data } = useDataConsumer();

  return data[city] ? (
    <AqiChart<{ date: string; aqi: number }>
      data={data[city].map(({aqi, date}) => ({aqi, date: relativeTimeToNow(date)}))}
      type="line"
      config={{
        yAxisKey: "aqi",
        xAxisKey: "date",
        showBorderColor: true,
        stepSize: 50,
      }}
    />
  ) : null;
};

export default AqiCityChart;
