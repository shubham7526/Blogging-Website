import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './Router'
import { Context } from './context/global';
import './App.css';

const App = ()=> {
  return (
    <Context>
      <Router/>
    </Context>
  );
}

export default App;
