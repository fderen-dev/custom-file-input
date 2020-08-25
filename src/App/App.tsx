import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../state/reducer';

import gear from '../statics/icons/gear.svg';

import './App.scss';

const App: React.FunctionComponent = () => {
  const header: string = useSelector((state: RootState) => state.example.header);
  return (
    <div className="app">
      <div className="examplary-container">
        <img src={gear} />
        <h1>{header}</h1>
      </div>
    </div>
  );
};

export default App;
