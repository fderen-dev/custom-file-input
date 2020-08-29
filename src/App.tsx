import React from 'react';

import FileImport from './components/FileImport';

import './App.scss';

const App: React.FunctionComponent = () => {
  return (
    <div className="app">
      <div style={{ width: '400px', height: '100px' }}>
        <FileImport multiple acceptedFiles="image/*" />
      </div>
    </div>
  );
};

export default App;
