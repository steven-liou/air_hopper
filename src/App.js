import React, {Component, useState, useReducer} from 'react';
import './App.css';
import Table from './components/Table';
import Paginator from './components/Paginator';

import data from './data';
import pageReducer from './reducers/pageReducer';
const {routes, routesInReadableFormat} = data;

const App = () => {
  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];
  const routeRows = routesInReadableFormat(routes);
  const routesPerPage = 25;
  const initialPageState = {
    page: 0,
    totalRows: routeRows.length,
    startRow: 0,
    endRow: routesPerPage,
    rowsPerPage: routesPerPage,
  };

  const [pageState, dispatch] = useReducer(pageReducer, initialPageState);

  const rowsToDisplay = routeRows.slice(pageState.startRow, pageState.endRow);

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
        <Paginator state={pageState} dispatch={dispatch} />
      </section>
    </div>
  );
};

export default App;
