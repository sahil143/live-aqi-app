import * as React from "react";
import './Table.css'

type TableProps<D> = {
  header: { id: string; title: string }[];
  data: D[];
  row: React.FC<{ data: D }>;
};

const Table = <D extends {}>({
  header,
  data,
  row: Row,
}: TableProps<D>) => {
  return (
    <table>
      <thead>
        <tr>
          {header.map((h) => {
            return <th>{h.title}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={`key-${i}`}>
            <Row data={d} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
