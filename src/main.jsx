import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {BrowserRouter} from 'react-router-dom'

//Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min';

//SBAdmin2 Style
import './assets/css/sb-admin-2.css';

//fontawesome
import '@fortawesome/fontawesome-free/css/all.min.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('wrapper')
);
