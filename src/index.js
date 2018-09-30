import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import SquareContainer from './components/SquareContainer/SquareContainer';

ReactDOM.render(<SquareContainer />, document.getElementById('root'));
registerServiceWorker();
