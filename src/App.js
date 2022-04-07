import React, {Component, useState, useReducer, useEffect} from 'react';
import './App.css';
import Table from './components/Table';
import Paginator from './components/Paginator';

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

  const onlyUnique = (value, index, self) => self.indexOf(value) === index;
  const airlines = filteredState.data.map((row) => row.airline).filter(onlyUnique);
  airlines.unshift('All');

  const handleChange = (e) => {
    const property = e.target.name;
    if (e.target.value === 'All') {
      filterRowsDispatch({type: 'ALL', payload: property});
    } else {
      filterRowsDispatch({
        type: 'FILTER',
        payload: {
          property,
          value: e.target.value,
        },
      });
    }
    setSelected(e.target.value);
  };

  useEffect(() => {
    pageDispatch({type: 'SET_TOTAL_ROWS', payload: filteredRows.length});
  }, [filteredRows]);

  const [selected, setSelected] = useState('All');

  return (
    <div className='app'>
      <header className='header'>
        <h1 className='title'>Airline Routes</h1>
      </header>
      <section>
        <form>
          <label htmlFor='airlines'>Show routes on</label>
          <select id='airline' name='airline' onChange={handleChange}>
            {airlines.map((airline, index) => {
              return (
                <option
                  key={index}
                  value={airline}
                  disabled={selected === 'All' || airline === 'All' ? false : airline !== selected}
                >
                  {airline}
                </option>
              );
            })}
          </select>
        </form>
        <Table className='routes-table' columns={columns} rows={rowsToDisplay} format={formatValue} />
        <Paginator state={pageState} dispatch={pageDispatch} />
      </section>
    </div>
  );
};

export default App;
