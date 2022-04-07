import React, {Component} from 'react';
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
  const rows = routesInReadableFormat(routes);

  const formatValue = (property, value) => {
    return value.toUpperCase();
  };
  return (
    <div className='app'>
      <header className='header'>
        <h1 className='title'>Airline Routes</h1>
      </header>
      <section>
        <Table className='routes-table' columns={columns} rows={rows} format={formatValue} />
      </section>
    </div>
  );
};

export default App;
