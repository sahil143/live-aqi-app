import * as React from "react";
import { Link } from "react-router-dom";
import { getColorFromRange, relativeTimeToNow } from "../../utils";
import { useDataConsumer } from "../data-provider/DataProvider";
import Table from "../Table/Table";
import { TableData } from "../Table/TableData";

type AqiTableDataType = { city: string; aqi: number; date: string };

const AqiTableRow = ({ data }: { data: AqiTableDataType }) => {
  return (
    <>
      <TableData>
        <Link style={{ textDecoration: "none" }} to={`/city/${data.city}`}>
          {data.city}
        </Link>
      </TableData>
      <TableData style={{ backgroundColor: getColorFromRange(data.aqi) }}>
        {data.aqi.toFixed(2)}
      </TableData>
      <TableData>{relativeTimeToNow(data.date)}</TableData>
    </>
  );
};

const AqiTable: React.FC = () => {
  const { city, latest } = useDataConsumer();
  const aqiTableData = city.map((c) => {
    const { aqi, date } = latest[c];
    return {
      city: c,
      aqi,
      date,
    };
  });

  return (
    <Table<AqiTableDataType>
      header={[
        { id: "city", title: "City" },
        { id: "aqi", title: "Latest AQI" },
        { id: "date", title: "Last Updated" },
      ]}
      data={aqiTableData}
      row={AqiTableRow}
    />
  );
};

export default AqiTable;
