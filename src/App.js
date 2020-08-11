import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import { CountryList } from "./countrylist/CountryList";
import { CountryDetails } from './countrydetails/CountryDetails';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Countries</p>
      </header>

      <Router>
        <Switch>
          <Route path="/" exact children={<CountryList />} />
          <Route path="/country/:id" children={<CountryDetails />} />
          <Route path="*" children={<p>Page not found!</p>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
