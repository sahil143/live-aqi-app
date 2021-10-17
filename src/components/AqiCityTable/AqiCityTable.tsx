import * as React from "react";
import { relativeTimeToNow } from "../../utils";
import { useDataConsumer } from "../data-provider/DataProvider";
import Table from "../Table/Table";
import { TableData } from "../Table/TableData";

const AqiCityTableRow = ({ data }: { data: { aqi: number; date: string } }) => {
  return (
    <>
      <TableData>{data.aqi.toFixed(2)}</TableData>
      <TableData>{relativeTimeToNow(data.date)}</TableData>
    </>
  );
};

const AqiCityTable: React.FC<{ city: string }> = ({ city }) => {
  const { data } = useDataConsumer();

  return data[city] ? (
    <Table
      data={[...data[city]].reverse()}
      header={[
        { id: "aqi", title: "AQI" },
        { id: "date", title: "Last Updated" },
      ]}
      row={AqiCityTableRow}
    />
  ) : null;
};

export default AqiCityTable;
