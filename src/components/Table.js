import React, {useState} from 'react';
import data from '../data';
const {getAirlineById, getAirportByCode} = data;

const Table = ({columns, rows, format, columnHeaders}) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(({name, property}, index) => (
            <ColumnHeader key={index} name={format(property, name)} />
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          return <TableRow key={index} cols={row} columnHeaders={columns.map((col) => col.property)} />;
        })}
      </tbody>
    </table>
  );
};

const ColumnHeader = ({name}) => <th scope='col'>{name}</th>;

const TableRow = ({cols, columnHeaders}) => {
  return (
    <tr>
      <th scope='row'>{cols[columnHeaders[0]]}</th>
      {columnHeaders.slice(1).map((label, index) => (
        <td key={index}>{cols[label]}</td>
      ))}
    </tr>
  );
};

export default Table;
