import { Score } from "../models/Score.model";
import { useEffect, useState } from "react";

const renderValue = (object: any, key: string) => object[key];

export default function Table({
  data,
  columns,
}: {
  data: Score[];
  columns: any[];
}) {
  const [tableHeader, setTableHeader] = useState<JSX.Element>();
  const [tableData, setTableData] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const header: JSX.Element = (
      <tr>
        <th></th>
        {columns?.map((column, index) => {
          return (
            <th className="text-left" key={index}>
              {column.label}
            </th>
          );
        })}
      </tr>
    );

    const tableData: JSX.Element[] = data?.map((row, index) => {
      return (
        <tr key={index} className="hover">
          <th className="font-bold lg:!static">{index + 1}</th>
          {Object.entries(row).map(([key, value], index) => {
            if (columns[index].valueRender) {
              return (
                <td key={index}>
                  {renderValue(value, columns[index].valueRender)}
                </td>
              );
            }
            return <td key={index}>{value}</td>;
          })}
        </tr>
      );
    });
    setTableHeader(header);
    setTableData(tableData);
  }, [columns, data]);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>{tableHeader}</thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
}
