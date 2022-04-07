import React, {Component, useState, useReducer, useEffect} from 'react';
import './App.css';
import Table from './components/Table';
import Paginator from './components/Paginator';
import Select from './components/Select';

import data from './data';
import pageReducer from './reducers/pageReducer';
import filterReducer from './reducers/filterReducer';
const {routes, routesInReadableFormat} = data;

const App = () => {
  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];
  const routeRows = routesInReadableFormat(routes);
  const initialRouteRowsState = {
    data: routeRows,
    filteredData: routeRows,
    filters: [],
  };

  const [filteredState, filterRowsDispatch] = useReducer(filterReducer, initialRouteRowsState);

  const filteredRows = filteredState.filteredData;

  const routesPerPage = 25;
  const initialPageState = {
    page: 0,
    totalRows: filteredRows.length,
    startRow: 0,
    endRow: routesPerPage,
    rowsPerPage: routesPerPage,
  };

  const [pageState, pageDispatch] = useReducer(pageReducer, initialPageState);

  const rowsToDisplay = filteredRows.slice(pageState.startRow, pageState.endRow);

  const formatValue = (property, value) => {
    return value.toUpperCase();
  };

  const handleSelect = (property, keys, setter) => {
    return (e) => {
      if (e.target.value === 'All') {
        filterRowsDispatch({type: 'ALL', payload: property});
      } else {
        filterRowsDispatch({
          type: 'FILTER',
          payload: {
            property,
            keys,
            value: e.target.value,
          },
        });
      }
      setter(e.target.value);
    };
  };

  const clearFilter = (e) => {
    e.preventDefault();
    filterRowsDispatch({type: 'CLEAR'});
    setAirline('All');
    setAirport('All');
  };

  useEffect(() => {
    pageDispatch({type: 'SET_TOTAL_ROWS', payload: filteredRows.length});
  }, [filteredRows]);

  const [airline, setAirline] = useState('All');
  const [airport, setAirport] = useState('All');

  return (
    <div className='app'>
      <header className='header'>
        <h1 className='title'>Airline Routes</h1>
      </header>
      <section>
        <form>
          <Select
            options={routeRows}
            filteredOptions={filteredRows}
            valueKeys={['airline']}
            titleKey='airlines'
            label='Show routs on'
            value={airline}
            onSelect={handleSelect('airlines', 'airline', setAirline)}
          />
          <Select
            options={routeRows}
            filteredOptions={filteredRows}
            valueKeys={['src', 'dest']}
            titleKey='airport'
            label='Show routs on'
            value={airport}
            onSelect={handleSelect('airports', ['src', 'dest'], setAirport)}
          />
          <button onClick={clearFilter}>Show All Routes</button>
        </form>
        <Table className='routes-table' columns={columns} rows={rowsToDisplay} format={formatValue} />
        <Paginator state={pageState} dispatch={pageDispatch} />
      </section>
    </div>
  );
};

export default App;
