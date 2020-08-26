import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './index.css';

function render(): void {
  ReactDOM.render(<App />, document.getElementById('root'));
}

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App.tsx', render);
}
