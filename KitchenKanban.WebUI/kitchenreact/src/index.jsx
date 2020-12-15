import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import store from './store/store'
import {Provider} from 'react-redux';

render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

