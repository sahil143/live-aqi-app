import * as React from "react";
import AqiChart, { ChartType } from "./AqiChart";
import { useDataConsumer } from "../data-provider/DataProvider";
import "./AqiHomeChart.css";

const AqiBarChart: React.FC = () => {
  const { city, latest } = useDataConsumer();
  const [chart, setChart] = React.useState<ChartType>("bar");

  const aqiData = city.map((c) => {
    const { aqi } = latest[c];
    return {
      city: c,
      aqi,
    };
  });

  const handleChange = React.useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>) => {
      setChart(e.currentTarget.value as ChartType);
    },
    []
  );

  return (
    <>
      <div className="aqi-chart-form">
        <span className="aqi-chart-form__radio">
          <input
            type="radio"
            id="bar-chart"
            name="chart"
            value="bar"
            onChange={handleChange}
            checked={chart === "bar"}
          />
          <label htmlFor="bar-chart">Bar Chart</label>
        </span>
        <span>
          <input
            type="radio"
            id="line-chart"
            name="chart"
            value="line"
            onChange={handleChange}
            checked={chart === "line"}
          />
          <label htmlFor="line-chart">Line Chart</label>
        </span>
      </div>
      <AqiChart<{ city: string; aqi: number }>
        data={aqiData}
        type={chart}
        config={{
          yAxisKey: "aqi",
          xAxisKey: "city",
          showBorderColor: true,
          showBackgroundColor: true,
          stepSize: 50,
        }}
      />
    </>
  );
};

export default AqiBarChart;
