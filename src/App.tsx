import React from 'react';

import FileImport from './components/FileImport';

import './App.scss';

const App: React.FunctionComponent = () => {
  return (
    <div className="app">
      <div style={{ width: '400px', height: '150px' }}>
        <FileImport multiple acceptedFiles="image/*" maxFilesAmount={5} maxFilesMBSize={2} />
      </div>
    </div>
  );
};

export default App;
