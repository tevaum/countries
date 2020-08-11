import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

      <Router>
        <Switch>
          <Route path="/" exact>
            <CountryList />
          </Route>
          <Router path="/country/:id">
            <p>Country details</p>
          </Router>
          <Route path="*">
            <p>Country not found!</p>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
