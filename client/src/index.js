import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Bootstrap CSS Library
import 'bootstrap/dist/css/bootstrap.min.css';
// Animations CSS Library
import 'animate.css'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

