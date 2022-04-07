import React, {Component, useState, useRef} from 'react';
import './App.css';
import Table from './components/Table';
import Paginator from './components/Paginator';

import data from './data';
const {routes, routesInReadableFormat} = data;

const App = () => {
  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];
  const routeRows = routesInReadableFormat(routes);

  const [page, setPage] = useState(0);
  const [routesPerPage, setRoutesPerPage] = useState(25);

  const startRouteRow = routesPerPage * page;
  const endRouteRow =
    startRouteRow + routesPerPage > routeRows.length ? routeRows.length : startRouteRow + routesPerPage;
  const rowsToDisplay = routeRows.slice(startRouteRow, endRouteRow);
  const totalPages = Math.ceil(routeRows.length / routesPerPage);

  const movePage = (change) => {
    let currentPage = page + change;
    if (currentPage < 0) {
      currentPage = 0;
    } else if (currentPage >= totalPages) {
      currentPage = page;
    }

    setPage(currentPage);
  };

  const formatValue = (property, value) => {
    return value.toUpperCase();
  };

  return (
    <div className='app'>
      <header className='header'>
        <h1 className='title'>Airline Routes</h1>
      </header>
      <section>
        <Table className='routes-table' columns={columns} rows={rowsToDisplay} format={formatValue} />
        <Paginator
          startRow={startRouteRow}
          endRow={endRouteRow}
          totalRows={routeRows.length}
          page={page}
          movePage={movePage}
          totalPages={totalPages}
          rowsPerPage={routesPerPage}
          setRowsPerPage={setRoutesPerPage}
        />
      </section>
    </div>
  );
};

export default App;
