import * as React from "react";
import AqiChart from "./AqiChart";
import { useDataConsumer } from "../data-provider/DataProvider";

const AqiBarChart: React.FC = () => {
  const { city, latest } = useDataConsumer();

  const aqiData = city.map((c) => {
    const { aqi } = latest[c];
    return {
      city: c,
      aqi,
    };
  });

  return (
    <AqiChart<{ city: string; aqi: number }>
      data={aqiData}
      type="bar"
      config={{
        yAxisKey: "aqi",
        xAxisKey: "city",
        showBackgroundColor: true,
        stepSize: 50,
      }}
    />
  );
};

export default AqiBarChart;
