import { match as RMatch } from "react-router-dom";
import AqiCityChart from "./AqiChart/AqiCityChart";
import AqiCityTable from "./AqiCityTable/AqiCityTable";

const CityPage: React.FC<{ match: RMatch<{ city: string }> }> = ({ match }) => {
  const city = match.params.city;

  return (
    <>
      <AqiCityChart city={city} />
      <AqiCityTable city={city} />
    </>
  );
};

export default CityPage;
