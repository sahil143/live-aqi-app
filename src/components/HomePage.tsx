import AqiBarChart from "./AqiChart/AqiBarChart";
import AqiTable from "./AqiTable/AqiTable";

const HomePage = () => {
  return (
    <>
      <AqiBarChart />
      <h2>Live Air Quality Index</h2>
      <span>Click on one of the Cities below to see it's history</span>
      <AqiTable />
    </>
  );
};

export default HomePage;
