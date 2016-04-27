require('./main.css');
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import alt from './libs/alt';
import persist from './libs/persist';

persist(alt, 'app');

ReactDOM.render(<App />, document.getElementById('app'));
