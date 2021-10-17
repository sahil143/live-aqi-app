import daysjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const relativeTimeToNow = (date: string): string => {
  daysjs.extend(relativeTime);
  return daysjs(date).fromNow();
};

export const COLORS = {
  green: "#55A84F",
  lightGreen: "#A2C853",
  yellow: "#FDF834",
  orange: "#F29C33",
  lightRed: "#E93F33",
  red: "#AE2D24",
};

export const getColorFromRange = (aqi: number) => {
  if (aqi > 0 && aqi <= 50) return COLORS.green;
  else if (aqi > 50 && aqi <= 100) return COLORS.lightGreen;
  else if (aqi > 100 && aqi <= 200) return COLORS.yellow;
  else if (aqi > 200 && aqi <= 300) return COLORS.orange;
  else if (aqi > 300 && aqi <= 400) return COLORS.lightRed;
  else if (aqi > 400 && aqi <= 500) return COLORS.red;
  else return "black";
};
