import React, {Component} from 'react';
import './App.css';
import data from './data';
const {routes, airlines, airports, getAirlineById, getAirportByCode} = data;

const Route = ({airline, src, dest}) => {
  airline = getAirlineById(airline).name;
  src = getAirportByCode(src).name;
  dest = getAirportByCode(dest).name;
  return (
    <tr>
      <th scope='row'>{airline}</th>
      <td>{src}</td>
      <td>{dest}</td>
    </tr>
  );
};

const Routes = ({routes}) => {
  return (
    <table>
      <thead>
        <tr>
          <th scope='col'>Airline</th>
          <th scope='col'>Origin</th>
          <th scope='col'>Destination</th>
        </tr>
      </thead>
      <tbody>
        {routes.map((route, index) => {
          return <Route key={index} {...route} />;
        })}
      </tbody>
    </table>
  );
};

const App = () => (
  <div className='app'>
    <header className='header'>
      <h1 className='title'>Airline Routes</h1>
    </header>
    <section>
      <Routes routes={routes} />
    </section>
  </div>
);

export default App;
