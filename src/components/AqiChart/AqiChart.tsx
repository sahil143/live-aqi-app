import * as React from "react";
import Chart, { ScriptableContext, Color, ChartType } from "chart.js/auto";
import { COLORS } from "../../utils";
import "./AqiChart.css";

type AqiChartProps<D> = {
  data: D[];
  type: "bar" | "line";
  config?: {
    stepSize?: number;
    xAxisKey?: string;
    yAxisKey?: string;
    showBorderColor?: boolean;
    showBackgroundColor?: boolean;
  };
};

const AqiChart = <D extends {}>({
  data,
  type,
  config: {
    stepSize,
    yAxisKey = "x",
    xAxisKey = "y",
    showBorderColor,
    showBackgroundColor,
  } = {},
}: AqiChartProps<D>) => {
  const canvasRef = React.useRef<HTMLCanvasElement>();
  const chartRef = React.useRef<Chart<"bar" | "line", D[], unknown>>();
  const gradientRef = React.useRef<{
    gradient: CanvasGradient | null;
    width: number | null;
    height: number | null;
  }>({
    gradient: null,
    width: null,
    height: null,
  });

  const xAxisData = React.useMemo(() => {
    return data ? data.map((d: any) => d[xAxisKey]) : [];
  }, [data, xAxisKey]);

  const yAxisData = React.useMemo(() => {
    return data ? data.map((d: any) => d[yAxisKey]) : [];
  }, [data, yAxisKey]);

  const getColorGradient = React.useCallback(
    (context: ScriptableContext<ChartType>): Color => {
      const chart = context.chart;
      const { ctx, chartArea } = chart;

      if (!chartArea) {
        // This case happens on initial chart load
        return "";
      }
      const chartWidth = chartArea.right - chartArea.left;
      const chartHeight = chartArea.bottom - chartArea.top;
      let { gradient, width, height } = gradientRef.current;
      if (gradient === null || width !== chartWidth || height !== chartHeight) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(
          0,
          chartArea.bottom,
          0,
          chartArea.top
        );
        // gradient values for the graph
        gradient.addColorStop(0, COLORS.green);
        gradient.addColorStop(0.09, COLORS.green); // 45
        gradient.addColorStop(0.11, COLORS.lightGreen); // 55
        gradient.addColorStop(0.19, COLORS.lightGreen); // 95
        gradient.addColorStop(0.22, COLORS.yellow); // 110
        gradient.addColorStop(0.38, COLORS.yellow); // 190
        gradient.addColorStop(0.42, COLORS.orange); // 210
        gradient.addColorStop(0.52, COLORS.orange); // 290
        gradient.addColorStop(0.62, COLORS.lightRed); // 310
        gradient.addColorStop(0.78, COLORS.lightRed); // 390
        gradient.addColorStop(0.82, COLORS.red); // 410
        gradient.addColorStop(1, COLORS.red); // 500
      }

      return gradient;
    },
    []
  );

  const chartRefCallback = React.useCallback(
    (node) => (canvasRef.current = node),
    []
  );

  React.useEffect(() => {
    chartRef.current = new Chart(canvasRef.current, {
      type,
      data: {
        labels: xAxisData,
        datasets: [
          {
            data: yAxisData,
            borderColor: showBorderColor ? getColorGradient : undefined,
            backgroundColor: showBackgroundColor ? getColorGradient : undefined,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        parsing: {
          xAxisKey: xAxisKey,
          yAxisKey: yAxisKey,
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            max: 500,
            min: 0,
            ticks: stepSize ? { stepSize } : undefined,
          },
        },
      },
    });
    return () => {
      chartRef.current?.destroy();
    };
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data.datasets[0].data = yAxisData;
      chartRef.current.data.labels = xAxisData;
      chartRef.current.update();
    }
  }, [xAxisData, yAxisData]);

  return (
    <div className="aqi-chart">
      <canvas ref={chartRefCallback} width="1000" height="500" />
    </div>
  );
};

export default AqiChart;
