import React from 'react';
import logo from './logo.svg';
import './App.css';

import { CountryList } from "./countrylist/CountryList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Countries</p>
      </header>

      <CountryList />
    </div>
  );
}

export default App;
