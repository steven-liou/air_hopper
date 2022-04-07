import React, {useState} from 'react';
import data from '../data';
const {getAirlineById, getAirportByCode} = data;

const Table = ({columns, rows, format}) => {
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
          return <TableRow key={index} cols={row} />;
        })}
      </tbody>
    </table>
  );
};

const ColumnHeader = ({name}) => <th scope='col'>{name}</th>;

const TableRow = ({cols}) => {
  return (
    <tr>
      <th scope='row'>{cols[0]}</th>
      {cols.slice(1).map((col, index) => (
        <td key={index}>{col}</td>
      ))}
    </tr>
  );
};

export default Table;
