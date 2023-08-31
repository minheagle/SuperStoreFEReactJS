import React from "react";

const Table = ({
  columns,
  dataSource,
  className,
  styleHead,
  styleLineHead,
  styleCellHead,
  styleBody,
  styleLineBody,
  styleCellBody,
}) => {
  const handleRenderTableHead = () => {
    return columns?.map((column, index) => {
      const className =
        (column.layout ? `w-${column.layout}` : "") +
        " " +
        (styleCellHead ? styleCellHead : "");
      return (
        <th key={index} className={className}>
          {column.title}
        </th>
      );
    });
  };

  const handleRenderTableBody = () => {
    return dataSource?.map((row, index) => (
      <tr key={index} className={styleLineBody ? styleLineBody : ""}>
        {columns.map((column, index) => (
          <td key={index} className={styleCellBody ? styleCellBody : ""}>
            {column.render ? column.render(row) : row[column.key]}
          </td>
        ))}
      </tr>
    ));
  };
  return (
    <table className={className ? className : ""}>
      <thead className={styleHead ? styleHead : ""}>
        <tr className={styleLineHead ? styleLineHead : ""}>
          {handleRenderTableHead()}
        </tr>
      </thead>
      <tbody className={styleBody ? styleBody : ""}>
        {handleRenderTableBody()}
      </tbody>
    </table>
  );
};

export default Table;
