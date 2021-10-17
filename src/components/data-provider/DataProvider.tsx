import * as React from "react";
import { useWebSockets } from "../../hooks/useWebSockets";

type DataType = {
  city: string[];
  data: {
    [city: string]: { date: string; aqi: number }[];
  };
  latest: {
    [city: string]: { aqi: number; date: string };
  };
};

const URL = "ws://city-ws.herokuapp.com/";

const DataContext = React.createContext<DataType>({} as DataType);

export const useDataConsumer = () => React.useContext(DataContext);

export const DataProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<DataType>({
    city: [],
    data: {},
    latest: {},
  });
  useWebSockets(
    URL,
    React.useCallback((wsData: { city: string; aqi: number }[]) => {
      const date = new Date().toISOString();
      wsData.forEach(({ city, aqi }) => {
        setState((prevState) => {
          if (!prevState.city.includes(city)) {
            prevState.city.push(city);
          }
          if (prevState.data.hasOwnProperty(city)) {
            const lastAqis =
              prevState.data[city][prevState.data[city].length - 1].aqi;
            if (lastAqis !== aqi) {
              prevState.data[city].push({ date, aqi });
            }
          } else {
            prevState.data[city] = [{ date, aqi }];
          }
          prevState["latest"][city] = { aqi, date };
          return { ...prevState };
        });
      });
    }, [])
  );
  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};
