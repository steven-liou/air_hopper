import React, {Component, useState} from 'react';
import './App.css';
import Table from './components/Table';
import data from './data';
const {routes, routesInReadableFormat} = data;

const App = () => {
  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];
  const routeRows = routesInReadableFormat(routes).slice(0, 99);

  const [page, setPage] = useState(0);
  const routesPerPage = 25;
  const startRouteRow = routesPerPage * page;
  const endRouteRow = startRouteRow + routesPerPage;
  const rowsToDisplay = routeRows.slice(startRouteRow, endRouteRow);
  const totalPages = Math.ceil(routeRows.length / routesPerPage);

  const movePage = (change) => {
    let currentPage = page + change;
    if (currentPage < 0) {
      currentPage = 0;
    } else if (currentPage > totalPages) {
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
        <Table className='routes-table' columns={columns} rows={rowsToDisplay} rowsPerPage={25} format={formatValue} />
        <Paginator
          startRow={startRouteRow}
          endRow={endRouteRow}
          totalRows={routeRows.length}
          page={page}
          movePage={movePage}
          totalPages={totalPages}
        />
      </section>
    </div>
  );
};

const Paginator = ({startRow, endRow, totalRows, rowsPerPage, page, movePage, totalPages}) => {
  return (
    <div>
      <Message startRoute={startRow + 1} endRoute={endRow} totalRoutes={totalRows} />
      <Button label='Previous Page' handleClick={() => movePage(-1)} disabled={page <= 0} />
      <Button label='Next Page' handleClick={() => movePage(1)} disabled={page >= totalPages - 1} />
    </div>
  );
};

const Message = ({startRoute, endRoute, totalRoutes}) => (
  <p>
    Showing {startRoute}-{/* {endRoute} */} of {totalRoutes} routes.
  </p>
);

const Button = ({label, handleClick, disabled}) => {
  return (
    <button onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default App;
