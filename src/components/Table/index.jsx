import "./index.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function Table({ data, columns }) {
  const [tableHeader, setTableHeader] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const header = (
      <tr>
        {columns.map((column, index) => {
          return (
            <th className="text-left" key={index}>
              {column.label}
            </th>
          );
        })}
      </tr>
    );

    const tableData = data.map((row, index) => {
      return (
        <tr key={index}>
          {Object.entries(row).map(([key, value], index) => {
            if (columns[index].valueRender) {
              return <td key={index}>{columns[index].valueRender(value)}</td>;
            }
            return <td key={key}>{value}</td>;
          })}
        </tr>
      );
    });
    setTableHeader(header);
    setTableData(tableData);
  }, [columns]);

  return (
    <table className="w-full table-auto border-collapse">
      <thead className="p-10">{tableHeader}</thead>
      <tbody>{tableData}</tbody>
    </table>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};
